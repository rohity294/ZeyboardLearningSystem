package mypack.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import mypack.service.OpenAIService;

@RestController
@RequestMapping("/api/v1/openai-data")
public class OpenAIController {
	private OpenAIService openAIService;
	// @Autowired can be avoided because this Spring bean has only 1 constructor
	
	public OpenAIController(OpenAIService openAIService) {
		super();
		this.openAIService = openAIService;
	}

	// Swagger Documentation
	//http://localhost:8080/swagger-ui/index.html
	@Operation(summary = "Getting data from OpenAI API")
	@ApiResponse(description = "Returns OpenAI API Data", responseCode = "200")
	// Swagger Documentation
	@GetMapping
	String getAllOpenAIApiData() {
		return "Test Data";
	}
	
	@PostMapping
	String consumePromptAndFetchAllOpenApiData(@RequestBody String prompt) {
		String responseBody = this.openAIService.consumePromptAndFetchAllOpenApiData(prompt);
		System.out.println(responseBody);
		return responseBody;
	}
}
