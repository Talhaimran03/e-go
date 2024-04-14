package ego;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface RewardRepository extends CrudRepository<Reward, Integer> {
    @Query("SELECT r FROM Reward r JOIN r.users u WHERE u.id = :userId")
    List<Reward> findByUserId(@Param("userId") Integer userId);
}
