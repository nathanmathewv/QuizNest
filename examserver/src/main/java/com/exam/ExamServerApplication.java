package com.exam;

// import com.exam.model.User;
// import com.exam.service.UserService;
// import com.exam.model.Role;
// import com.exam.model.UserRole;
// import java.util.HashSet;
// import java.util.Set;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner {

	// @Autowired
	// private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Server started");

		// User user = new User();
		// user.setFirstName("null");
		// user.setLastName("null2");
		// user.setUsername("admin");
		// user.setPassword("admin");
		// user.setEmail("null@gmail.com");
		// user.setProfile("default.png");

		// Role role1 = new Role();
		// role1.setRoleId(44L);
		// role1.setRoleName("ADMIN");

		// Set<UserRole> userRoleSet = new HashSet<>();
		// UserRole userRole = new UserRole();
		// userRole.setRole(role1);
		// userRole.setUser(user);
		// userRoleSet.add(userRole);

		// User user1 = this.userService.createUser(user, userRoleSet);
		// System.out.println(user1.getUsername());
	}

}
