package ego;

import org.springframework.data.repository.CrudRepository;

// import ego.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface BusPathRepository extends CrudRepository<BusPath, Integer> {
}