Feature: Edit master

  Scenario:
    Given a user who is already a master
    When app sends request to "api_edit_master" url with updating required data
    Then it should get response with update success status