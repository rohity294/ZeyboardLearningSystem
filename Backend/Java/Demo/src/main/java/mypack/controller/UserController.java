package mypack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mypack.model.User;
import mypack.service.UserService;

@RestController
@RequestMapping("/api/v1/user-data")
public class UserController {
	
	@Autowired
    private UserService userService;
   
      
	public UserController(UserService UserService) {
		super();
		this.userService = UserService;
	}
	
	@PostMapping("/register")
	User registerUser(@RequestBody User user) {
		return this.userService.saveUser(user);
	}
	
	@PostMapping("/login")
	boolean loginUser(@RequestBody User user) {
		return this.userService.validateUserCredentials(user.getUsername(), user.getPassword());
	}
	
}
