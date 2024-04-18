package ego.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ego.model.Route;
import ego.model.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface RouteRepository extends CrudRepository<Route, Integer> {
    Optional<Route> findARouteByUserIdAndActiveTrue(Integer userId);
    List<Route> findByUserAndActiveTrue(User user);

    @Query("SELECT r FROM Route r WHERE r.user.id = :userId AND r.endCoordinates IS NOT NULL")
    List<Route> findByUserIdAndEndCoordinatesIsNotNull(Integer userId);
}