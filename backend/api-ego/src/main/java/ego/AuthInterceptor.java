package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = "spring:session:sessions:" + request.getHeader("Authorization");
        if (token == null || !isValidToken(token)) {
            
            Response<String> errorResponse = new Response<>(false);
            errorResponse.setErrors("Token mancante o non valido");
            
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
            
            return false;
        }
        return true;
    }

    private boolean isValidToken(String token) {
        return redisTemplate.hasKey(token);
    }
}
