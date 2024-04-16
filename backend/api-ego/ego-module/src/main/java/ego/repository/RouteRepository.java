package ego.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ego.model.Route;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface RouteRepository extends CrudRepository<Route, Integer> {
    List<Route> findByUserId(Integer userId);
}