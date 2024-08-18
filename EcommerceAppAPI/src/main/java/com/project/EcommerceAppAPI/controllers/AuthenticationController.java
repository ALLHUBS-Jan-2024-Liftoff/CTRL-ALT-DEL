package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.models.User;
import com.project.EcommerceAppAPI.models.dto.LoginFormDTO;
import com.project.EcommerceAppAPI.models.dto.RegisterFormDTO;
import com.project.EcommerceAppAPI.models.dto.UserBadgeDTO;
import com.project.EcommerceAppAPI.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    //method to set the user in a session
    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    //Registration endpoint
    @PostMapping(value= "/register" )
    public ResponseEntity<Map> processRegistrationForm(@RequestBody RegisterFormDTO registerFormDTO,
                                                       HttpServletRequest request)  {
        ResponseEntity response = null;
        Map<String, String> responseBody = new HashMap<>();
        try{
            User existingUser = userRepository.findByUsername(registerFormDTO.getUsername()); //checks if the user already exists
            if (existingUser == null && !registerFormDTO.getUsername().isEmpty() && !registerFormDTO.getPassword().isEmpty()){
                responseBody.put("message", "Given user details are successfully registered");
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(responseBody);
                User newUser = new User(
                        registerFormDTO.getUsername(),
                        registerFormDTO.getPassword(),
                        registerFormDTO.getFirstName(),
                        registerFormDTO.getLastName(),
                        registerFormDTO.getEmail()
                );

                if (registerFormDTO.isWantToBeSeller()) {
                    newUser.setSeller(true);
                }
                userRepository.save(newUser);
                setUserInSession(request.getSession(), newUser);

            } else if(existingUser != null) {
                responseBody.put("message", "User Already Exists.");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            } else if(registerFormDTO.getUsername().isEmpty()) {
                responseBody.put("message", "Username required.");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            } else if (registerFormDTO.getPassword().isEmpty()) {
                responseBody.put("message", "Password required");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            }
            if (registerFormDTO.getEmail().isEmpty()) {
                responseBody.put("message", "Email is required.");
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            }

            if (registerFormDTO.getFirstName().isEmpty() || registerFormDTO.getLastName().isEmpty()) {
                responseBody.put("message", "Full name is required.");
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            }
        }catch (Exception ex){
            responseBody.put("message", "An exception occurred due to " + ex.getMessage());
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseBody);
        }
        return response;
    }

    //Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map> processLoginForm(@RequestBody LoginFormDTO loginFormDTO, HttpServletRequest request) {

        ResponseEntity response = null;
        Map<String, String> responseBody = new HashMap<>();
        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
        String password = loginFormDTO.getPassword();
        if (theUser == null) {
            responseBody.put("message", "Username does not exist");
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
        }else if (!theUser.isMatchingPassword(password)) {
            responseBody.put("message", "Password does not match");
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
        } else {
            setUserInSession(request.getSession(), theUser);
            responseBody.put("message", "User successfully logged in.");
            responseBody.put("username", theUser.getUsername());
            response = ResponseEntity
                    .status(HttpStatus.OK)
                    .body(responseBody);
        }
        return  response;
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "User successfully logged out.");
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @GetMapping("/user/badge")
    public ResponseEntity<UserBadgeDTO> getUserBadgeInfo(HttpSession session) {
        User currentUser = getUserFromSession(session);

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Create initials by concatenating the first letter of firstName and lastName
        String initials = currentUser.getFirstName().substring(0, 1).toUpperCase() +
                currentUser.getLastName().substring(0, 1).toUpperCase();

        // Prepare the UserBadgeDTO
        UserBadgeDTO userBadgeDTO = new UserBadgeDTO(
                initials,
                currentUser.isSeller(),
                currentUser.isVerifiedSeller()
        );

        return ResponseEntity.ok(userBadgeDTO);
    }
}
