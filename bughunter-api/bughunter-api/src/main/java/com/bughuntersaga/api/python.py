import os
import textwrap

# --- Configuración del Proyecto ---
BASE_SRC_DIR = os.path.join("src", "main", "java")
BASE_PACKAGE = "com.bughuntersaga.api"
# ---------------------------------

# Convertir el nombre del paquete a una ruta de directorios
BASE_PACKAGE_PATH = "."

def create_file(file_path, content):
    """
    Crea un archivo con el contenido dado.
    Crea los directorios necesarios si no existen.
    """
    full_path = file_path
    try:
        directory = os.path.dirname(full_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory)

        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(textwrap.dedent(content))
        print(f"CREATED: {full_path}")
    except Exception as e:
        print(f"ERROR creating {full_path}: {e}")

# --- Plantillas de Contenido Java ---

def get_class_content(package_name, class_name, imports="", annotations="", extends="", implements="", body=""):
    implements_str = f" implements {implements}" if implements else ""
    extends_str = f" extends {extends}" if extends else ""
    if not body:
        body = "\n    // Contenido de la clase\n"
    return f"""
    package {package_name};
    
    {imports}
    
    {annotations}
    public class {class_name}{extends_str}{implements_str} {{
    {body}
    }}
    """

def get_interface_content(package_name, interface_name, imports="", annotations="", extends=""):
    extends_str = f" extends {extends}" if extends else ""
    if annotations:
        annotations += "\n"
    return f"""
    package {package_name};
    
    {imports}
    
    {annotations}public interface {interface_name}{extends_str} {{
    
        // Contenido de la interfaz
    
    }}
    """

def get_record_content(package_name, record_name, imports="", fields_comment=""):
    return f"""
    package {package_name};
    
    {imports}
    
    /**
     * DTO para {record_name}.
     * {fields_comment}
     */
    public record {record_name}(
        // TODO: Definir campos basados en el OpenAPI
        // {fields_comment}
    ) {{
    }}
    """

# --- Funciones de Generación por Capa ---

def generate_main_application():
    """Crea la clase principal de la aplicación Spring Boot."""
    main_class_content = f"""
    package {BASE_PACKAGE};

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;

    @SpringBootApplication
    public class BugHunterSagaApiApplication {{
    
        public static void main(String[] args) {{
            SpringApplication.run(BugHunterSagaApiApplication.class, args);
        }}
    
    }}
    """
    create_file(os.path.join(BASE_PACKAGE_PATH, "BugHunterSagaApiApplication.java"), main_class_content)

def generate_domain_layer():
    """Crea la capa de Dominio (modelos puros, excepciones)."""
    print("\n--- Generando Capa de Dominio ---")
    domain_pkg = f"{BASE_PACKAGE}.domain"

    # --- Modelos de Dominio (POJOs) ---
    model_path = os.path.join(BASE_PACKAGE_PATH, "domain", "model")
    model_pkg = f"{domain_pkg}.model"

    # Modelos basados en SQL y lógica de OpenAPI
    domain_models = [
        "User", "UserProfile", "Module", "Unit", "Lesson", "Problem",
        "UserLessonProgress", "UserXpHistory", "UserStreak",
        "Leaderboard", "LeaderboardEntry", "ShopItem", "AuthToken"
    ]

    imports = "import lombok.Getter;\nimport lombok.Setter;\nimport lombok.Builder;\nimport lombok.NoArgsConstructor;\n"
    annotations = "@Getter\n@Setter\n@Builder\n@NoArgsConstructor"

    for model in domain_models:
        create_file(
            os.path.join(model_path, f"{model}.java"),
            get_class_content(model_pkg, model, imports, annotations)
        )

    # --- Excepciones de Dominio ---
    exception_path = os.path.join(BASE_PACKAGE_PATH, "domain", "exception")
    exception_pkg = f"{domain_pkg}.exception"
    exceptions = [
        "UserNotFoundException", "ModuleNotFoundException", "InvalidCredentialsException",
        "InsufficientFundsException", "LessonAlreadyCompletedException", "TreasureAlreadyClaimedException",
        "UsernameAlreadyExistsException", "EmailAlreadyExistsException", "ResourceNotFoundException"
    ]

    for ex in exceptions:
        body = f"""
    public {ex}(String message) {{
        super(message);
    }}
    """
        create_file(
            os.path.join(exception_path, f"{ex}.java"),
            get_class_content(exception_pkg, ex, "import java.lang.RuntimeException;\n", "", extends="RuntimeException", body=body)
        )

def generate_application_layer():
    """Crea la capa de Aplicación (Casos de Uso, Puertos In/Out, DTOs de App)."""
    print("\n--- Generando Capa de Aplicación ---")
    app_pkg = f"{BASE_PACKAGE}.application"

    # --- Puertos de Entrada (Casos de Uso) ---
    port_in_path = os.path.join(BASE_PACKAGE_PATH, "application", "port", "in")
    port_in_pkg = f"{app_pkg}.port.in"

    # Nombres basados en los 'summary' de OpenAPI
    use_cases = [
        "RegisterUserUseCase", "LoginUserUseCase", "ForgotPasswordUseCase",
        "GetModulesUseCase", "GetModuleUnitUseCase", "GetModuleProblemsUseCase",
        "GetUserProfileUseCase", "UpdateUserAccountUseCase", "UpdateUserSettingsUseCase", "GetUserStatsUseCase",
        "CompleteLessonUseCase", "ClaimTreasureUseCase",
        "GetLeaderboardUseCase", "GetShopItemsUseCase", "PurchaseItemUseCase"
    ]

    for uc in use_cases:
        create_file(
            os.path.join(port_in_path, f"{uc}.java"),
            get_interface_content(port_in_pkg, uc)
        )

    # --- Puertos de Salida (Abstracciones de Infra) ---
    port_out_path = os.path.join(BASE_PACKAGE_PATH, "application", "port", "out")
    port_out_pkg = f"{app_pkg}.port.out"

    # Basados en las tablas SQL y necesidades de seguridad
    ports_out = [
        "UserRepositoryPort", "UserProfileRepositoryPort", "ModuleRepositoryPort",
        "UnitRepositoryPort", "LessonRepositoryPort", "ProblemRepositoryPort",
        "UserLessonProgressRepositoryPort", "UserXpHistoryRepositoryPort", "UserStreakRepositoryPort",
        "ShopItemRepositoryPort", "LeaderboardRepositoryPort",
        "PasswordEncoderPort", "TokenGeneratorPort", "TransactionPort"
    ]

    for port in ports_out:
        create_file(
            os.path.join(port_out_path, f"{port}.java"),
            get_interface_content(port_out_pkg, port)
        )

    # --- DTOs de Aplicación (Comandos y Queries) ---
    app_dto_path = os.path.join(BASE_PACKAGE_PATH, "application", "dto")
    app_dto_pkg = f"{app_pkg}.dto"

    # DTOs internos para los casos de uso
    app_dtos = [
        "RegisterUserCommand", "LoginUserCommand", "ForgotPasswordCommand",
        "UpdateUserAccountCommand", "UpdateUserSettingsCommand",
        "CompleteLessonCommand", "ClaimTreasureCommand", "PurchaseItemCommand",
        "GetModuleUnitQuery", "GetModuleProblemsQuery"
    ]

    imports = "import lombok.Builder;\nimport lombok.Getter;\n"
    annotations = "@Getter\n@Builder"

    for dto in app_dtos:
        create_file(
            os.path.join(app_dto_path, f"{dto}.java"),
            get_class_content(app_dto_pkg, dto, imports, annotations, body="\n    // TODO: Definir campos para el comando/query\n")
        )

    # --- Servicios/Implementación de Casos de Uso ---
    service_path = os.path.join(BASE_PACKAGE_PATH, "application", "service")
    service_pkg = f"{app_pkg}.service"

    imports = "import lombok.RequiredArgsConstructor;\nimport org.springframework.stereotype.Service;\n"
    annotations = "@Service\n@RequiredArgsConstructor"

    for uc in use_cases:
        service_name = uc.replace("UseCase", "Service") # ej. RegisterUserService
        create_file(
            os.path.join(service_path, f"{service_name}.java"),
            get_class_content(service_pkg, service_name,
                              imports + f"import {port_in_pkg}.{uc};\n",
                              annotations,
                              implements=uc)
        )

def generate_infrastructure_layer():
    """Crea la capa de Infraestructura (Web, Persistencia, Seguridad, Config)."""
    print("\n--- Generando Capa de Infraestructura ---")
    infra_pkg = f"{BASE_PACKAGE}.infrastructure"

    # --- 1. Adaptadores de Entrada (Web) ---
    web_pkg = f"{infra_pkg}.web"

    # --- Controladores ---
    controller_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "web", "controller")
    controller_pkg = f"{web_pkg}.controller"

    app_port_in_pkg = f"{BASE_PACKAGE}.application.port.in"

    # AuthController
    body = f"""
    private final {app_port_in_pkg}.RegisterUserUseCase registerUserUseCase;
    private final {app_port_in_pkg}.LoginUserUseCase loginUserUseCase;
    private final {app_port_in_pkg}.ForgotPasswordUseCase forgotPasswordUseCase;
    
    // TODO: Implementar endpoints de OpenAPI
    // @PostMapping("/register") ...
    // @PostMapping("/login") ...
    // @PostMapping("/forgot-password") ...
    """
    create_file(os.path.join(controller_path, "AuthController.java"),
                get_class_content(controller_pkg, "AuthController", f"import lombok.RequiredArgsConstructor;\nimport org.springframework.web.bind.annotation.*;\nimport {app_port_in_pkg}.*;\n",
                                  "@RestController\n@RequiredArgsConstructor\n@RequestMapping(\"/auth\")", body=body))

    # ContentController
    body = f"""
    private final {app_port_in_pkg}.GetModulesUseCase getModulesUseCase;
    private final {app_port_in_pkg}.GetModuleUnitUseCase getModuleUnitUseCase;
    private final {app_port_in_pkg}.GetModuleProblemsUseCase getModuleProblemsUseCase;
    
    // TODO: Implementar endpoints de OpenAPI
    // @GetMapping("/modules") ...
    // @GetMapping("/modules/{{moduleCode}}/unit") ...
    // @GetMapping("/modules/{{moduleCode}}/problems") ...
    """
    create_file(os.path.join(controller_path, "ContentController.java"),
                get_class_content(controller_pkg, "ContentController", f"import lombok.RequiredArgsConstructor;\nimport org.springframework.web.bind.annotation.*;\nimport {app_port_in_pkg}.*;\n",
                                  "@RestController\n@RequiredArgsConstructor\n@RequestMapping(\"/content\")", body=body))

    # UserController
    body = f"""
    private final {app_port_in_pkg}.GetUserProfileUseCase getUserProfileUseCase;
    private final {app_port_in_pkg}.UpdateUserAccountUseCase updateUserAccountUseCase;
    private final {app_port_in_pkg}.UpdateUserSettingsUseCase updateUserSettingsUseCase;
    private final {app_port_in_pkg}.GetUserStatsUseCase getUserStatsUseCase;

    // TODO: Implementar endpoints de OpenAPI
    // @GetMapping("/me/profile") ...
    // @PutMapping("/me/account") ...
    // @PutMapping("/me/settings") ...
    // @GetMapping("/me/stats") ...
    """
    create_file(os.path.join(controller_path, "UserController.java"),
                get_class_content(controller_pkg, "UserController", f"import lombok.RequiredArgsConstructor;\nimport org.springframework.web.bind.annotation.*;\nimport {app_port_in_pkg}.*;\n",
                                  "@RestController\n@RequiredArgsConstructor\n@RequestMapping(\"/users\")", body=body))

    # ProgressController
    body = f"""
    private final {app_port_in_pkg}.CompleteLessonUseCase completeLessonUseCase;
    private final {app_port_in_pkg}.ClaimTreasureUseCase claimTreasureUseCase;

    // TODO: Implementar endpoints de OpenAPI
    // @PostMapping("/lesson") ...
    // @PostMapping("/treasure/{{lessonId}}") ...
    """
    create_file(os.path.join(controller_path, "ProgressController.java"),
                get_class_content(controller_pkg, "ProgressController", f"import lombok.RequiredArgsConstructor;\nimport org.springframework.web.bind.annotation.*;\nimport {app_port_in_pkg}.*;\n",
                                  "@RestController\n@RequiredArgsConstructor\n@RequestMapping(\"/progress\")", body=body))

    # GamificationController
    body = f"""
    private final {app_port_in_pkg}.GetLeaderboardUseCase getLeaderboardUseCase;
    private final {app_port_in_pkg}.GetShopItemsUseCase getShopItemsUseCase;
    private final {app_port_in_pkg}.PurchaseItemUseCase purchaseItemUseCase;
    
    // TODO: Implementar endpoints de OpenAPI
    // @GetMapping("/leaderboard") ...
    // @GetMapping("/shop/items") ...
    // @PostMapping("/shop/purchase/{{itemId}}") ...
    """
    create_file(os.path.join(controller_path, "GamificationController.java"),
                get_class_content(controller_pkg, "GamificationController", f"import lombok.RequiredArgsConstructor;\nimport org.springframework.web.bind.annotation.*;\nimport {app_port_in_pkg}.*;\n",
                                  "@RestController\n@RequiredArgsConstructor", body=body))

    # --- DTOs de API (Basados en Schemas de OpenAPI) ---
    api_dto_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "web", "dto")
    api_dto_pkg = f"{web_pkg}.dto"

    api_dtos = [
        "UserRegistrationDTO", "UserLoginDTO", "AuthResponseDTO", "UserInfoDTO",
        "UserProfileDTO", "UserAccountUpdateDTO", "UserSettingsUpdateDTO", "UserStatsDTO",
        "ModuleSummaryDTO", "UnitDetailDTO", "LessonTileDTO", "ProblemDTO",
        "LessonResultDTO", "LessonCompletionResponseDTO", "LeaderboardDTO",
        "LeaderboardEntryDTO", "ShopItemDTO", "ErrorDTO", "ForgotPasswordDTO"
    ]

    imports = "import jakarta.validation.constraints.*;\nimport com.fasterxml.jackson.annotation.JsonInclude;\n"
    annotations = "@JsonInclude(JsonInclude.Include.NON_NULL)"

    for dto in api_dtos:
        create_file(
            os.path.join(api_dto_path, f"{dto}.java"),
            get_record_content(api_dto_pkg, dto, imports + annotations, f"Schema: {dto} de OpenAPI")
        )

    # --- Mappers de API (DTO Api <-> DTO App) ---
    api_mapper_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "web", "mapper")
    api_mapper_pkg = f"{web_pkg}.mapper"

    mappers = ["AuthApiMapper", "ContentApiMapper", "UserApiMapper", "ProgressApiMapper", "GamificationApiMapper"]
    imports = "import org.mapstruct.Mapper;\nimport org.mapstruct.ReportingPolicy;\n"
    annotations = "@Mapper(componentModel = \"spring\", unmappedTargetPolicy = ReportingPolicy.IGNORE)"

    for mapper in mappers:
        create_file(
            os.path.join(api_mapper_path, f"{mapper}.java"),
            get_interface_content(api_mapper_pkg, mapper, imports, annotations)
        )

    # --- Manejador Global de Excepciones ---
    exception_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "web", "exception")
    exception_pkg = f"{web_pkg}.exception"

    create_file(
        os.path.join(exception_path, "GlobalApiExceptionHandler.java"),
        get_class_content(exception_pkg, "GlobalApiExceptionHandler", "import org.springframework.web.bind.annotation.RestControllerAdvice;\n", "@RestControllerAdvice")
    )

    # --- 2. Adaptadores de Salida (Persistencia) ---
    persistence_pkg = f"{infra_pkg}.persistence"
    entity_pkg = f"{persistence_pkg}.entity"

    # --- Entidades JPA (Basadas 1:1 en tu SQL) ---
    entity_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "persistence", "entity")

    # UserEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport java.util.UUID;\nimport java.time.ZonedDateTime;\n"
    body = """
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(length = 100)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "created_at", updatable = false, columnDefinition = "timestamptz DEFAULT (now())")
    private ZonedDateTime createdAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfileEntity userProfile;
    """
    create_file(os.path.join(entity_path, "UserEntity.java"),
                get_class_content(entity_pkg, "UserEntity", imports, "@Entity\n@Table(name = \"users\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # UserProfileEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport java.util.UUID;\n"
    body = """
    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable = false)
    private Integer lingots;

    @Column(name = "daily_xp_goal", nullable = false)
    private Integer dailyXpGoal;

    @Column(name = "sound_effects_enabled", nullable = false)
    private Boolean soundEffectsEnabled;
    """
    create_file(os.path.join(entity_path, "UserProfileEntity.java"),
                get_class_content(entity_pkg, "UserProfileEntity", imports, "@Entity\n@Table(name = \"user_profiles\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # ModuleEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport java.util.List;\nimport org.hibernate.annotations.JdbcTypeCode;\nimport org.hibernate.type.SqlTypes;\n"
    body = """
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 20)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ui_config", columnDefinition = "jsonb")
    private String uiConfig; // O Map<String, Object> si tienes Jackson

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UnitEntity> units;
    """
    create_file(os.path.join(entity_path, "ModuleEntity.java"),
                get_class_content(entity_pkg, "ModuleEntity", imports, "@Entity\n@Table(name = \"modules\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # UnitEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport java.util.List;\n"
    body = """
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private ModuleEntity module;

    @Column(name = "unit_number", nullable = false)
    private Integer unitNumber;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LessonEntity> lessons;
    """
    create_file(os.path.join(entity_path, "UnitEntity.java"),
                get_class_content(entity_pkg, "UnitEntity", imports, "@Entity\n@Table(name = \"units\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # LessonEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport java.util.List;\n"
    body = """
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private UnitEntity unit;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer position;
    
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProblemEntity> problems;
    """
    create_file(os.path.join(entity_path, "LessonEntity.java"),
                get_class_content(entity_pkg, "LessonEntity", imports, "@Entity\n@Table(name = \"lessons\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # ProblemEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport org.hibernate.annotations.JdbcTypeCode;\nimport org.hibernate.type.SqlTypes;\n"
    body = """
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private LessonEntity lesson;

    @Column(nullable = false, length = 50)
    private String type;
    
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private String content; // O Map<String, Object>

    @Column(nullable = false)
    private Integer position;
    """
    create_file(os.path.join(entity_path, "ProblemEntity.java"),
                get_class_content(entity_pkg, "ProblemEntity", imports, "@Entity\n@Table(name = \"problems\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # UserLessonProgressId (para clave compuesta)
    imports = "import jakarta.persistence.Embeddable;\nimport lombok.*;\nimport java.io.Serializable;\nimport java.util.UUID;\n"
    body = """
    private UUID userId;
    private Integer lessonId;
    """
    create_file(os.path.join(entity_path, "UserLessonProgressId.java"),
                get_class_content(entity_pkg, "UserLessonProgressId", imports, "@Embeddable\n@Getter\n@Setter\n@NoArgsConstructor\n@AllArgsConstructor\n@EqualsAndHashCode", implements="Serializable", body=body))

    # UserLessonProgressEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport java.time.ZonedDateTime;\n"
    body = """
    @EmbeddedId
    private UserLessonProgressId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("lessonId")
    @JoinColumn(name = "lesson_id")
    private LessonEntity lesson;

    @Column(name = "completed_at", columnDefinition = "timestamptz DEFAULT (now())")
    private ZonedDateTime completedAt;
    """
    create_file(os.path.join(entity_path, "UserLessonProgressEntity.java"),
                get_class_content(entity_pkg, "UserLessonProgressEntity", imports, "@Entity\n@Table(name = \"user_lesson_progress\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # UserXpHistoryEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\nimport java.util.UUID;\nimport java.time.ZonedDateTime;\n"
    body = """
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "xp_earned", nullable = false)
    private Integer xpEarned;

    @Column(name = "source_type", length = 50)
    private String sourceType;

    @Column(name = "source_id")
    private Integer sourceId;

    @Column(name = "created_at", columnDefinition = "timestamptz DEFAULT (now())")
    private ZonedDateTime createdAt;
    """
    create_file(os.path.join(entity_path, "UserXpHistoryEntity.java"),
                get_class_content(entity_pkg, "UserXpHistoryEntity", imports, "@Entity\n@Table(name = \"user_xp_history\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # UserStreakId (para clave compuesta)
    imports = "import jakarta.persistence.Embeddable;\nimport lombok.*;\nimport java.io.Serializable;\nimport java.util.UUID;\nimport java.time.LocalDate;\n"
    body = """
    private UUID userId;
    private LocalDate activityDate;
    """
    create_file(os.path.join(entity_path, "UserStreakId.java"),
                get_class_content(entity_pkg, "UserStreakId", imports, "@Embeddable\n@Getter\n@Setter\n@NoArgsConstructor\n@AllArgsConstructor\n@EqualsAndHashCode", implements="Serializable", body=body))

    # UserStreakEntity
    imports = "import jakarta.persistence.*;\nimport lombok.*;\n"
    body = """
    @EmbeddedId
    private UserStreakId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserEntity user;
    """
    create_file(os.path.join(entity_path, "UserStreakEntity.java"),
                get_class_content(entity_pkg, "UserStreakEntity", imports, "@Entity\n@Table(name = \"user_streaks\")\n@Getter\n@Setter\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor", body=body))

    # Entidades de Gamificación (no en SQL, pero implícitas en OpenAPI)
    create_file(os.path.join(entity_path, "ShopItemEntity.java"),
                get_class_content(entity_pkg, "ShopItemEntity", imports, "@Entity\n@Table(name = \"shop_items\")\n@Getter\n@Setter"))
    create_file(os.path.join(entity_path, "LeagueEntity.java"),
                get_class_content(entity_pkg, "LeagueEntity", imports, "@Entity\n@Table(name = \"leagues\")\n@Getter\n@Setter"))


    # --- Repositorios Spring Data JPA ---
    repo_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "persistence", "repository")
    repo_pkg = f"{persistence_pkg}.repository"

    jpa_repos = {
        "UserJpaRepository": ("UserEntity", "UUID", "import java.util.UUID;"),
        "UserProfileJpaRepository": ("UserProfileEntity", "UUID", "import java.util.UUID;"),
        "ModuleJpaRepository": ("ModuleEntity", "Integer", ""),
        "UnitJpaRepository": ("UnitEntity", "Integer", ""),
        "LessonJpaRepository": ("LessonEntity", "Integer", ""),
        "ProblemJpaRepository": ("ProblemEntity", "Integer", ""),
        "UserLessonProgressJpaRepository": ("UserLessonProgressEntity", "UserLessonProgressId", f"import {entity_pkg}.UserLessonProgressId;"),
        "UserXpHistoryJpaRepository": ("UserXpHistoryEntity", "Long", ""),
        "UserStreakJpaRepository": ("UserStreakEntity", "UserStreakId", f"import {entity_pkg}.UserStreakId;"),
        "ShopItemJpaRepository": ("ShopItemEntity", "Integer", ""), # Asumiendo ID de ShopItem
        "LeagueJpaRepository": ("LeagueEntity", "Integer", ""), # Asumiendo ID de League
    }

    for repo, (entity, id_type, extra_imports) in jpa_repos.items():
        imports = (
            f"import {entity_pkg}.{entity};\n"
            "import org.springframework.data.jpa.repository.JpaRepository;\n"
            "import org.springframework.stereotype.Repository;\n"
            f"{extra_imports}\n"
        )
        create_file(
            os.path.join(repo_path, f"{repo}.java"),
            get_interface_content(repo_pkg, repo, imports, "@Repository", extends=f"JpaRepository<{entity}, {id_type}>")
        )

    # --- Adaptadores de Puertos de Persistencia ---
    adapter_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "persistence", "adapter")
    adapter_pkg = f"{persistence_pkg}.adapter"

    port_pkg = f"{BASE_PACKAGE}.application.port.out"
    imports = "import lombok.RequiredArgsConstructor;\nimport org.springframework.stereotype.Repository;\n"
    annotations = "@Repository\n@RequiredArgsConstructor"

    # Mapea puertos a sus adaptadores
    port_adapters = [
        "UserRepositoryAdapter", "UserProfileRepositoryAdapter", "ModuleRepositoryAdapter",
        "UnitRepositoryAdapter", "LessonRepositoryAdapter", "ProblemRepositoryAdapter",
        "UserLessonProgressRepositoryAdapter", "UserXpHistoryRepositoryAdapter", "UserStreakRepositoryAdapter",
        "ShopItemRepositoryAdapter", "LeaderboardRepositoryAdapter", "TransactionAdapter"
    ]

    for adapter in port_adapters:
        port_name = adapter.replace("Adapter", "Port")
        create_file(
            os.path.join(adapter_path, f"{adapter}.java"),
            get_class_content(adapter_pkg, adapter,
                              imports + f"import {port_pkg}.{port_name};\n",
                              annotations,
                              implements=port_name)
        )

    # --- Mappers de Persistencia (Dominio <-> Entidad) ---
    persistence_mapper_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "persistence", "mapper")
    persistence_mapper_pkg = f"{persistence_pkg}.mapper"

    mappers = ["UserPersistenceMapper", "ContentPersistenceMapper", "ProgressPersistenceMapper", "GamificationPersistenceMapper"]
    imports = "import org.mapstruct.Mapper;\nimport org.mapstruct.ReportingPolicy;\n"
    annotations = "@Mapper(componentModel = \"spring\", unmappedTargetPolicy = ReportingPolicy.IGNORE)"

    for mapper in mappers:
        create_file(
            os.path.join(persistence_mapper_path, f"{mapper}.java"),
            get_interface_content(persistence_mapper_pkg, mapper, imports, annotations)
        )

    # --- 3. Adaptadores de Salida (Seguridad) ---
    security_pkg = f"{infra_pkg}.security"

    # --- Adaptadores de Puertos de Seguridad ---
    security_adapter_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "security", "adapter")
    security_adapter_pkg = f"{security_pkg}.adapter"
    app_port_out_pkg = f"{BASE_PACKAGE}.application.port.out"

    security_adapters = {
        "SpringPasswordEncoderAdapter": "PasswordEncoderPort",
        "JwtTokenGeneratorAdapter": "TokenGeneratorPort"
    }

    imports = "import lombok.RequiredArgsConstructor;\nimport org.springframework.stereotype.Component;\n"
    annotations = "@Component\n@RequiredArgsConstructor"

    for adapter, port in security_adapters.items():
        create_file(
            os.path.join(security_adapter_path, f"{adapter}.java"),
            get_class_content(security_adapter_pkg, adapter,
                              imports + f"import {app_port_out_pkg}.{port};\n",
                              annotations,
                              implements=port)
        )

    # --- Configuración de Seguridad ---
    security_config_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "security", "config")
    security_config_pkg = f"{security_pkg}.config"

    imports = (
        "import lombok.RequiredArgsConstructor;\n"
        "import org.springframework.context.annotation.Bean;\n"
        "import org.springframework.context.annotation.Configuration;\n"
        "import org.springframework.security.config.annotation.web.builders.HttpSecurity;\n"
        "import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;\n"
        "import org.springframework.security.config.http.SessionCreationPolicy;\n"
        "import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;\n"
        "import org.springframework.security.crypto.password.PasswordEncoder;\n"
        "import org.springframework.security.web.SecurityFilterChain;\n"
    )
    annotations = "@Configuration\n@EnableWebSecurity\n@RequiredArgsConstructor"

    security_config_content = f"""
    package {security_config_pkg};
    
    {imports}
    
    {annotations}
    public class SecurityConfiguration {{
    
        @Bean
        public PasswordEncoder passwordEncoder() {{
            return new BCryptPasswordEncoder();
        }}
    
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {{
            http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    // Endpoints públicos de tu OpenAPI
                    .requestMatchers(\"/api/auth/**\").permitAll() // /api/auth/register, /api/auth/login, etc.
                    .requestMatchers(\"/api/content/modules\").permitAll() // /api/content/modules
                    // El resto requiere autenticación
                    .anyRequest().authenticated()
                );
            
            // TODO: Aquí se agregaría el filtro JWT
            
            return http.build();
        }}
    }}
    """
    create_file(os.path.join(security_config_path, "SecurityConfiguration.java"), security_config_content)

    # --- 4. Configuración General (Opcional) ---
    config_path = os.path.join(BASE_PACKAGE_PATH, "infrastructure", "config")
    config_pkg = f"{infra_pkg}.config"

    imports = "import org.springframework.context.annotation.Configuration;\n"
    annotations = "@Configuration"

    bean_config_content = f"""
    package {config_pkg};
    
    {imports}
    
    {annotations}
    public class BeanConfiguration {{
    
        // La mayoría de los beans se inyectarán automáticamente
        // con @Service, @Repository, @Component y @RequiredArgsConstructor.
        // Puedes usar esta clase para beans personalizados.
    
    }}
    """
    create_file(os.path.join(config_path, "BeanConfiguration.java"), bean_config_content)


# --- Ejecución Principal ---
def main():
    print(f"--- Creando estructura de proyecto Java en '{BASE_SRC_DIR}' ---")
    print(f"--- Paquete Base: {BASE_PACKAGE} ---")

    # 1. Clase Principal
    generate_main_application()

    # 2. Capa de Dominio
    generate_domain_layer()

    # 3. Capa de Aplicación
    generate_application_layer()

    # 4. Capa de Infraestructura
    generate_infrastructure_layer()

    print("\n--- ¡Estructura de Java creada exitosamente! ---")
    print(f"Directorio base: {os.path.abspath(BASE_SRC_DIR)}")
    print("Siguientes pasos:")
    print("1. Abre el proyecto en tu IDE.")
    print("2. Asegúrate de tener un 'pom.xml' con las dependencias (Spring Web, Data JPA, Security, Lombok, MapStruct, PostgreSQL).")
    print("3. Crea tu 'application.properties' en 'src/main/resources'.")
    print("4. Revisa los 'TODO' y comienza a implementar la lógica.")

if __name__ == "__main__":
    main()