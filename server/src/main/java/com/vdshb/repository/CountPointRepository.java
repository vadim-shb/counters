package com.vdshb.repository;

import com.vdshb.domain.CountPoint;
import com.vdshb.util.SoftDeleteCrudRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public interface CountPointRepository extends SoftDeleteCrudRepository<CountPoint, Long> {

    //fixme: not load inactive
    List<CountPoint> findBySpaceId(Long spaceId);

    @Query(value = "SELECT DISTINCT c.id from count_point c JOIN space s ON s.id = c.space_id where s.user_id = ?1 and c.is_active = true and s.is_active = true", nativeQuery = true)
    Set<BigInteger> findUserCountPointIdsBigIntegerReturn(Long securityUserId);

    default Set<Long> findUserCountPointIds(Long securityUserId) {
        return findUserCountPointIdsBigIntegerReturn(securityUserId).stream()
                .map(BigInteger::longValue)
                .collect(Collectors.toSet());
    }
}