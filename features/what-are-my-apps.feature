Feature: What are my apps
  Verify my apps in my subscription

  Scenario Outline: My subscription is Free Access
    Given I have "<access>" access with "<paid>" status
    When I want to see my apps
    Then I should see the apps I have access to

    Examples:
      | access | paid      | apps      |
      | Free   | active    | discourse |
      | Free   | cancelled | discourse |
      | Full   | paid      | all       |
      | Full   | cancelled | all       |