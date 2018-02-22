Feature: Create master

  Scenario:
    Given some user who wants to be a master
    When app sends request to "api_create_master" url with all required data
    Then it should get response with success status