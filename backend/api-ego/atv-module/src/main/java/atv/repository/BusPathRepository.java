package atv.repository;

import org.springframework.data.repository.CrudRepository;

import atv.model.BusPath;

// import ego.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface BusPathRepository extends CrudRepository<BusPath, Integer> {
}
