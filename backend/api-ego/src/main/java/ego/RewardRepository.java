package ego;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface RewardRepository extends CrudRepository<Reward, Integer> {

}
