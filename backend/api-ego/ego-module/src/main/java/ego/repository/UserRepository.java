package ego.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ego.model.User;

// import ego.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    @Query("SELECT u FROM User u ORDER BY u.totalPoints DESC")
    Iterable<User> findAll();
    
    User findByEmail(String email);
    Boolean existsByEmail(String email);
    User findUserByToken(String token);
}