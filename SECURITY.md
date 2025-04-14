
# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.

## Security Best Practices

### Authentication Security

1. **OTP Verification**
   - OTP tokens should expire after 5 minutes (300 seconds)
   - Limit OTP verification attempts to 5 per hour
   - Use secure random number generation for OTP codes

2. **Password Protection**
   - Enable leaked password protection to prevent use of compromised passwords
   - Enforce password complexity requirements
   - Use secure hashing algorithms for password storage

3. **Session Management**
   - Implement short session timeouts for inactive users
   - Use secure, HTTP-only cookies
   - Regenerate session IDs after authentication

## Security Monitoring

Regular security audits should be conducted to ensure:
- Authentication mechanisms are properly implemented
- OTP verification timeouts are set to recommended values
- Leaked password protection is enabled
