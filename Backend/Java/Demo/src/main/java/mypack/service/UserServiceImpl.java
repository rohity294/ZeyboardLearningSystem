package mypack.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import mypack.model.User;
import mypack.repo.UserRepo;
import mypack.utilities.AllData;

@Service
public class UserServiceImpl implements UserService {

	// @Autowired can be avoided because this Spring bean has only 1 constructor
	private UserRepo userRepo;

	public UserServiceImpl(UserRepo userRepo) {
		super();
		this.userRepo = userRepo;
	}

	@Override
	public List<User> getAllUsers() {
		return this.userRepo.findAll();
	}

	@Override
	public User saveUser(User user) {
		return this.userRepo.save(user);
	}

	@Override
	public User getUserById(int userId) {
		return this.userRepo.getReferenceById(userId);
	}

	@Override
	public User updateUser(User user) {
		return this.userRepo.save(user);
	}

	@Override
	public void deleteUserById(int userId) {
		this.userRepo.deleteById(userId);
	}

	@Override
	public boolean validateUserCredentials(String username, String password) {
		int count = this.userRepo.validateUserCredentials(username, password);
		boolean result = count == 1? true:false;
		return result;
	}

   
	
}
