package mypack.service;

import java.util.List;

import mypack.model.User;

public interface UserService {
	
	public List<User> getAllUsers();
	public User saveUser(User user);
	public User getUserById(int userId);
	public User updateUser(User user);
	public void deleteUserById(int userId);
	public boolean validateUserCredentials(String username, String password);
	
	
}
