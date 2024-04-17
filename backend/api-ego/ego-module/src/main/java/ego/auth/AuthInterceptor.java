package ego.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;

import ego.model.Response;
import ego.util.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            return true;
        };

        // HttpSession session = request.getSession(false);

        String token = request.getHeader("Authorization");
        
        if (token == null || userService.getUserByToken(token.substring(7)) == null) {
            
            Response<String> errorResponse = new Response<>(false);
            errorResponse.setErrors("Token mancante o non valido");
            
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
            
            return false;
        }
        return true;
    }

}
