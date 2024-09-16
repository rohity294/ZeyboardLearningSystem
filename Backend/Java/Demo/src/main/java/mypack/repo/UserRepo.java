package mypack.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mypack.model.User;

//@Repository not needed because JpaRepository's implementation SimpleJpaRepositry has the @Repository annotation
//Also SimpleJpaRepository has @Transactional annotation, hence @Transactional annotation not needed in the Service Layer
public interface UserRepo extends JpaRepository<User, Integer>{
	
	@Query(nativeQuery = true, value = "select count(id) from ngf.users where username=:username and password=:password")
	int validateUserCredentials(@Param("username") String username, @Param("password") String password);
}
