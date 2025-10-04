import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestPassword {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Test the existing hash from database
        String existingHash = "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi";
        String testPassword = "user123";
        
        System.out.println("Testing password: " + testPassword);
        System.out.println("Existing hash: " + existingHash);
        System.out.println("Password matches: " + encoder.matches(testPassword, existingHash));
        
        // Generate a new hash for comparison
        String newHash = encoder.encode(testPassword);
        System.out.println("New hash: " + newHash);
        System.out.println("New hash matches: " + encoder.matches(testPassword, newHash));
    }
}
