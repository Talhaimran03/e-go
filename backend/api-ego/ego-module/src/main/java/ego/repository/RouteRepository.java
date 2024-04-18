package ego.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ego.model.Route;
import ego.model.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface RouteRepository extends CrudRepository<Route, Integer> {
    List<Route> findByUserId(Integer userId);
    Optional<Route> findARouteByUserIdAndActiveTrue(Integer userId);
    List<Route> findByUserAndActiveFalse(User user);
    List<Route> findByUserAndActiveTrue(User user);
}