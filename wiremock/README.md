# WireMock API Mocking

This directory contains WireMock configuration for mocking external APIs during development and testing.

## Directory Structure

```
wiremock/
├── mappings/          # API endpoint mappings (request/response definitions)
├── __files/          # Static response files referenced by mappings
└── README.md         # This file
```

## Available Endpoints

The following mock endpoints are available when WireMock is running:

### Health Check

- **GET** `/health`
- Returns a simple health status with timestamp

### Case Details

- **GET** `/api/cases/{caseId}`
- Returns detailed information about a case including applicant, animals, and movement details

### Permit Application

- **POST** `/api/permits/apply`
- Creates a new permit application and returns confirmation with generated ID and reference

### Animal Search

- **GET** `/api/animals/search?species={species}`
- Search for animals by species with regulation information

### Disinfectants API

- **GET** `/getApprovedDisinfectants?type={type}`
- Returns a list of approved disinfectants filtered by type (e.g., 'tbo' for Tuberculosis Orders)
- Response includes disinfectant names and approved dilution rates

## Usage

1. Start the services:

   ```bash
   docker-compose up wiremock
   ```

2. WireMock will be available at:

   - Local: http://localhost:8080
   - Via proxy: http://wiremock.your-domain.sslip.io:7300

3. Test an endpoint:
   ```bash
   curl http://localhost:8080/health
   curl http://localhost:8080/getApprovedDisinfectants?type=tbo
   ```

## Admin Interface

WireMock provides an admin interface for managing mappings:

- Admin API: http://localhost:8080/\_\_admin/
- View all mappings: http://localhost:8080/\_\_admin/mappings

## Adding New Mocks

1. **Create a mapping file** in `mappings/` directory:

   ```json
   {
     "request": {
       "method": "GET",
       "url": "/api/your-endpoint"
     },
     "response": {
       "status": 200,
       "headers": {
         "Content-Type": "application/json"
       },
       "bodyFileName": "your-response.json"
     }
   }
   ```

2. **Create response file** in `__files/` directory (if using `bodyFileName`)

3. **Restart WireMock** to load new mappings:
   ```bash
   docker-compose restart wiremock
   ```

## Advanced Features

- **Request Matching**: URL patterns, headers, query parameters, body matching
- **Response Templating**: Dynamic responses using Handlebars templates
- **Stateful Behavior**: Scenarios for multi-step interactions
- **Fault Injection**: Simulate network errors, delays, and timeouts

## Configuration

WireMock is configured with:

- `--global-response-templating`: Enables templating in all responses
- `--verbose`: Detailed logging for debugging

For more advanced configuration, modify the `command` section in `compose.yml`.

## Troubleshooting

1. **Mappings not loading**: Check JSON syntax in mapping files
2. **404 errors**: Verify URL patterns match your requests exactly
3. **Template errors**: Check Handlebars syntax in response templates

For more information, see the [WireMock documentation](http://wiremock.org/docs/).
