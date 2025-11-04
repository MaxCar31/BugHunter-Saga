package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.UserProfile;
import java.util.Optional;
import java.util.UUID;

public interface UserProfileRepositoryPort {
    UserProfile save(UserProfile userProfile);
    Optional<UserProfile> findById(UUID userId);
}
