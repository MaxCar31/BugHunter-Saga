package tic.BugHunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import tic.BugHunter.model.Module;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {

    Optional<Module> findByCode(String code);

    @Query("SELECT m FROM Module m LEFT JOIN FETCH m.units WHERE m.id = :id")
    Optional<Module> findByIdWithUnits(Integer id);

    @Query("SELECT m FROM Module m ORDER BY m.id")
    List<Module> findAllOrderedById();

    boolean existsByCode(String code);
}
