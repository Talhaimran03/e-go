package ego.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ego.model.Reward;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface RewardRepository extends CrudRepository<Reward, Integer> {

}
