package mypack;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import mypack.service.OpenAIService;
import mypack.service.OpenAIServiceImpl;

public class OpenAIServiceImplTests {
	OpenAIService openAIService = new OpenAIServiceImpl();
	
	
	@Test
	void testMethodUnderTest() {
		// Given
		// when(mockedDependency.someMethod()).thenReturn(someValue);

		// When
		// Result result = service.methodUnderTest();

		// Then
		// assertNotNull(result);
		// More assertions based on the expected behavior
	}
	
	@Test
    void testMethodUnderTest_Exception() {
        // Given
        //when(mockedDependency.someMethod()).thenThrow(new SomeException());
        
        // When & Then
//        assertThrows(SomeException.class, () -> {
//            service.methodUnderTest();
//        });
    }
	
    @Test
	void convertDecimalToRomanFrom1To3_Success() {
    	String actualResult = openAIService.convertDecimalToRomanFrom1To3(2);
    	String expectedResultFor2 = "II";
    	assertEquals(expectedResultFor2, actualResult);
	}
    
    @Test
	void convertDecimalToRomanFrom1To3_Failure_NoNegativeOrZero() {
    	String actualResult = openAIService.convertDecimalToRomanFrom1To3(0);
    	String expectedResultFor0 = "Invalid Input:Must be an integer in range 1 to 3, both inclusive";
    	assertEquals(expectedResultFor0, actualResult);
	}
    
    @Test
   	void convertDecimalToRomanFrom1To3_Failure_NoMoreThanThree() {
       	String actualResult = openAIService.convertDecimalToRomanFrom1To3(4);
       	String expectedResultFor4 = "Invalid Input:Must be an integer in range 1 to 3, both inclusive";
       	assertEquals(expectedResultFor4, actualResult);
   	}

}
