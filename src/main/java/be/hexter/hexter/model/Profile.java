package be.hexter.hexter.model;

import java.io.File;
import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Builder
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = false)
@NoArgsConstructor(force = true, access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonRootName(value = "profile", namespace = "profiles")
@Entity
@Table(name = "profiles")
public class Profile implements Serializable, Cloneable {

    @JsonIgnore
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private static final long serialVersionUID = 1L;

    @Id
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @NonNull
    @JsonProperty("user")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(unique = true, nullable = false, foreignKey = @ForeignKey(name = "user_id", value = ConstraintMode.CONSTRAINT), referencedColumnName = "id")
    public User user;

    @JsonProperty("picture")
    public File picture;

    @JsonProperty("birthdate")
    private LocalDate birthdate;

}
