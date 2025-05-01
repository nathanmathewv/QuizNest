package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.exception.UserFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        // check if this user already exists
        User local = this.userRepository.findByUsername(user.getUsername());

        if (local != null) {
            System.out.println("This username already exists");
            throw new UserFoundException();
        } 
        else { //create new user
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole()); //save the roles
            }
            user.getUserRoles().addAll(userRoles); //add roles to user
            local = this.userRepository.save(user); //save user
        }

        return local;
    }

    //get user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(User user) {
        return this.userRepository.save(user);
    }
    
}
