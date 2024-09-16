package mypack;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class MyWebConfig implements WebMvcConfigurer{
	 @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:4200/") // You can specify specific origins instead of "*"
	                .allowedMethods("GET", "POST", "PUT", "DELETE")
	                .allowedHeaders("Origin", "Content-Type", "Accept")
	                .allowCredentials(true);
	    }
}
