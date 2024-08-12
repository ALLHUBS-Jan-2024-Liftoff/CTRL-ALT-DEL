package com.project.EcommerceAppAPI;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

//import static spark.Spark.*;

@SpringBootApplication
public class EcommerceAppApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceAppApiApplication.class, args);

		port(4242); // Ensure this matches the port you're using

		// Load environment variables
		Dotenv dotenv = Dotenv.load();

		// Set your secret API key from an environment variable
		Stripe.apiKey = dotenv.get("STRIPE_SECRET_KEY");

		// Serve static files from the "public" directory
		staticFiles.externalLocation(
				Paths.get("public").toAbsolutePath().toString());


		// Endpoint to create a Stripe Checkout session
		post("/create-checkout-session", (req, res) -> {
			// Parse the request body
			Gson gson = new Gson();
			CartItem[] cartItems = gson.fromJson(req.body(), CartItem[].class);

			List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

			for (CartItem item : cartItems) {
				lineItems.add(
						SessionCreateParams.LineItem.builder()
								.setQuantity((long) item.getQuantity())
								.setPriceData(
										SessionCreateParams.LineItem.PriceData.builder()
												.setCurrency("usd")
												.setUnitAmount((long) (item.getPrice() * 100)) // Price in cents
												.setProductData(
														SessionCreateParams.LineItem.PriceData.ProductData.builder()
																.setName(item.getName())
																.build())
												.build())
								.build()
				);
			}

			SessionCreateParams params = SessionCreateParams.builder()
					.setMode(SessionCreateParams.Mode.PAYMENT)
					.setSuccessUrl("http://localhost:5174/success?session_id={CHECKOUT_SESSION_ID}")
					.setCancelUrl("http://localhost:5174/cancel")
					.addAllLineItem(lineItems)
					.build();

			try {
				Session session = Session.create(params);
				res.status(200);
				res.type("application/json");
				return gson.toJson(session.getId()); // Return the session ID as JSON
			} catch (StripeException e) {
				res.status(500);
				return "Error creating Stripe session: " + e.getMessage();
			}
		});
	}
}
