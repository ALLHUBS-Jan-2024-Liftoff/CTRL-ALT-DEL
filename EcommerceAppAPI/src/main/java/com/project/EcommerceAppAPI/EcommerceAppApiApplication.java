package com.project.EcommerceAppAPI;
import com.stripe.Stripe;

//import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.List;

import static spark.Spark.*;
//
//
//@SpringBootApplication
//public class EcommerceAppApiApplication {
//
//	@Value("${stripe.api.key}")
//
//
//	public static void main(String[] args) {
//		SpringApplication.run(EcommerceAppApiApplication.class, args);
//		port(8080); // Ensure this matches the port you're using
//
//		// CORS setup
//		options("/*", (request, response) -> {
//			String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
//			if (accessControlRequestHeaders != null) {
//				response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
//			}
//			String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
//			if (accessControlRequestMethod != null) {
//				response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
//			}
//			return "OK";
//		});
//
//		before((request, response) -> {
//			response.header("Access-Control-Allow-Origin", "*"); // Allow all origins
//			response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//			response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//		});
//
//		// Set your test secret API key
//		Stripe.apiKey = "sk_test_51PgYz3CD9TYzROTCjFuXHgPXKWxFAOvYjJqBlYpkAmpnTRecvVPjHJYPbWCWCMJEm4In0a6nTdnsOKOdIDVdptBA00jRBd3ogA";
//
//		staticFiles.externalLocation(Paths.get("public").toAbsolutePath().toString());
//
//		post("http://localhost:8080/create-checkout-session", (request, response) -> {
//			// Example data from the cart
//			// You need to parse and process actual cart data from the request
//			List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
//			// Add line items based on the cart
//			// For example:
//			lineItems.add(
//					SessionCreateParams.LineItem.builder()
//							.setPrice("price_id_from_stripe") // Use real price ID
//							.setQuantity(1L)
//							.build()
//			);
//
//			SessionCreateParams params = SessionCreateParams.builder()
//					.setMode(SessionCreateParams.Mode.PAYMENT)
//					.setSuccessUrl("http://localhost:4242/success")
//					.setCancelUrl("http://localhost:4242/canceled")
//					.addAllLineItem(lineItems)
//					.build();
//
//			Session session = Session.create(params);
//			response.redirect(session.getUrl(), 303);
//			return "";
//		});
//	}
//}
//import java.nio.file.Paths;
//import com.stripe.Stripe;
//import com.stripe.model.checkout.Session;
//import com.stripe.param.checkout.SessionCreateParams;
//import org.springframework.boot.SpringApplication;

//import static spark.Spark.*;
@SpringBootApplication
public class EcommerceAppApiApplication {

public static void main(String[] args) {
	SpringApplication.run(EcommerceAppApiApplication.class, args);
		port(8080); // Ensure this matches the port you're using

		// This is your test secret API key from Stripe
		Stripe.apiKey = "sk_test_51PgYz3CD9TYzROTCjFuXHgPXKWxFAOvYjJqBlYpkAmpnTRecvVPjHJYPbWCWCMJEm4In0a6nTdnsOKOdIDVdptBA00jRBd3ogA";

		// Serve static files from the "public" directory
		staticFiles.externalLocation(
				Paths.get("public").toAbsolutePath().toString());

		// CORS setup
		options("/*", (request, response) -> {
			String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
			if (accessControlRequestHeaders != null) {
				response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
			}
			String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
			if (accessControlRequestMethod != null) {
				response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
			}
			return "OK";
		});

		before((request, response) -> {
			response.header("Access-Control-Allow-Origin", "*"); // Allow all origins
			response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
		});

		// Endpoint to create a Stripe Checkout session
		post("/create-checkout-session", (request, response) -> {
			// Define the domain
			String YOUR_DOMAIN = "http://localhost:8080";

			// Create session parameters
			SessionCreateParams params = SessionCreateParams.builder()
					.setMode(SessionCreateParams.Mode.PAYMENT)
					.setSuccessUrl(YOUR_DOMAIN + "/success.html")
					.setCancelUrl(YOUR_DOMAIN + "/canceled.html")
					.addLineItem(
							SessionCreateParams.LineItem.builder()
									.setQuantity(1L)
									// Provide the exact Price ID (e.g., pr_1234) of the product you want to sell
									.setPrice("your-price-id-here")
									.build())
					.build();

			// Create a new Checkout session
			Session session = Session.create(params);

			// Redirect to the Checkout session URL
			response.redirect(session.getUrl(), 303);
			return "";
		});
	}
}