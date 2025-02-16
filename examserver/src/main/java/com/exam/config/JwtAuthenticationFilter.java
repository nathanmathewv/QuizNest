package com.exam.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.exam.service.impl.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
			throws ServletException, IOException {
		
		
		// get jwt
		//check if it starting from Bearer
		//validate
		
	final String requestTokenHeader = request.getHeader("Authorization");
	System.out.println("requestTokenHeader: " + requestTokenHeader);
	String username = null;
	String jwtToken = null;
	if(requestTokenHeader!= null && requestTokenHeader.startsWith("Bearer "))
	{
		jwtToken = requestTokenHeader.substring(7); // it will remove Bearer from
		System.out.println("jwtToken:" + jwtToken);
		try {
			username = this.jwtUtil.extractUsername(jwtToken);
			System.out.println("username: " + username);
        }catch(ExpiredJwtException e){
            e.printStackTrace();
            System.out.println("\n=================================================================================================================\n"
                       + "         Message: Token is Expired  \n"
                       + "==========================================================================================================================");
        }catch(Exception e)
		{
			 System.out.println("\n=================================================================================================================\n"
			           + "         Message: Token is not valid  \n"
			           + "==========================================================================================================================");
			
			response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		    response.getOutputStream().println("{\"a\":\"=================================================================================================\","
		        		+ " \"Exception\": \"Token is not valid\" ,"
		        		+ "\"b\":\"==============================================================================================================\"}");

			
			 		  
		}
	}
	
    else{
        System.out.println("\n=================================================================================================================\n"
                + "         Message: Token is not valid, Bearer not there  \n"
                + "==========================================================================================================================");
    }
	
	
		 // validate token
		if(username!= null && SecurityContextHolder.getContext().getAuthentication() == null) 
		{
			final UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(username);
 
			 System.out.println("name: "+ userDetails.getUsername());
			 System.out.println("password: "+ userDetails.getPassword());
			 
			 if(jwtUtil.validateToken(jwtToken, userDetails))
			 {
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =	new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				
			
			}
			else {
				System.out.println("Token is not valid");
			}
		
		
	}
	
	filterChain.doFilter(request, response);
		
		
	}

}