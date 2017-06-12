package com.vdshb.repository;

import com.vdshb.domain.Count;
import com.vdshb.util.SoftDeleteCrudRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public interface CountRepository extends SoftDeleteCrudRepository<Count, Long> {

    //fixme: not load inactive
    List<Count> findBySpaceId(Long spaceId);

    @Query(value = "SELECT DISTINCT c.id from count c JOIN space s ON s.id = c.space_id where s.user_id = ?1 and c.is_active = true and s.is_active = true", nativeQuery = true)
    Set<BigInteger> findUserCountIdsBigIntegerReturn(Long securityUserId);

    default Set<Long> findUserCountIds(Long securityUserId) {
        return findUserCountIdsBigIntegerReturn(securityUserId).stream()
                .map(BigInteger::longValue)
                .collect(Collectors.toSet());
    }
}