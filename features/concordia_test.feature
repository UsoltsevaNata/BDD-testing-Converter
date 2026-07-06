# language: en
Feature: Unit conversion

  UI Element: value
  - id is "#value"

   UI Element: type
  - id is "#type"

  UI Element: convertBtn
  - id is "#convertBtn"

  UI Element: errorBlock
  - id is "#errorBlock"

  UI Element: clearHistoryBtn
  - id is "#clearHistoryBtn"
#          Масса(1)
  Scenario: Kilograms to grams
  Variant: kilograms_to_grams
    Given that I am on "/"
    When I fill "5" in {value}
    And I select "kg-to-g" in {type}
    And I click on {convertBtn}
    Then I see "5 кг = 5000 г"

#           Длина (5)
  Scenario: Meters to kilometers
  Variant: meters_to_kilometers
    Given that I am on "/"
    When I fill "1500" in {value}
    And I select "m-to-km" in {type}
    And I click on {convertBtn}
    Then I see "1,5"


  Scenario: Kilometers to meters
  Variant: kilometers_to_meters
    Given that I am on "/"
    When I fill "1" in {value}
    And I select "km-to-m" in {type}
    And I click on {convertBtn}
    Then I see "1 км = 1000 м"

  Scenario: Meters to centimeters
  Variant: meters_to_centimeters
    Given that I am on "/"
    When I fill "1" in {value}
    And I select "m-to-cm" in {type}
    And I click on {convertBtn}
    Then I see "1 м = 100 см"

  Scenario: Centimeters to meters
  Variant: centimeters_to_meters
    Given that I am on "/"
    When I fill "250" in {value}
    And I select "cm-to-m" in {type}
    And I click on {convertBtn}
    Then I see "2,5"

  Scenario: Meters to millimeters
  Variant: meters_to_millimeters
    Given that I am on "/"
    When I fill "3" in {value}
    And I select "m-to-mm" in {type}
    And I click on {convertBtn}
    Then I see "3 м = 3000 мм"

#       Температура (3)
  Scenario: Celsius to Fahrenheit
  Variant: celsius_to_fahrenheit
    Given that I am on "/"
    When I fill "100" in {value}
    And I select "c-to-f" in {type}
    And I click on {convertBtn}
    Then I see "100 C = 212 F"

  Scenario: Fahrenheit to Celsius
  Variant: fahrenheit_to_celsius
    Given that I am on "/"
    When I fill "32" in {value}
    And I select "f-to-c" in {type}
    And I click on {convertBtn}
    Then I see "0"
  Scenario: Kelvin to Celsius
  Variant: kelvin_to_celsius
    Given that I am on "/"
    When I fill "0" in {value}
    And I select "k-to-c" in {type}
    And I click on {convertBtn}
    Then I see "-273,15"

#       Невалидные значения(7)
  Scenario: Non-numeric value
  Variant: alphabetic_string
    Given that I am on "/"
    When I fill "abc" in {value}
    And I select "kg-to-g" in {type}
    And I click on {convertBtn}
    Then I see {errorBlock} contains "Введите корректное числовое значение"

  Scenario: Symbols
  Variant: symbols
    Given that I am on "/"
    When I fill "!@#" in {value}
    And I select "m-to-km" in {type}
    And I click on {convertBtn}
    Then I see {errorBlock} contains "Введите корректное числовое значение"

  Scenario: Negative mass
  Variant: negative_mass
    Given that I am on "/"
    When I fill "-5" in {value}
    And I select "kg-to-g" in {type}
    And I click on {convertBtn}
    Then I see {errorBlock} contains "Значение не может быть отрицательным"

  Scenario: Negative length
  Variant: negative_length
    Given that I am on "/"
    When I fill "-100" in {value}
    And I select "m-to-km" in {type}
    And I click on {convertBtn}
    Then I see {errorBlock} contains "Значение не может быть отрицательным"

  Scenario: Negative Kelvin
  Variant: negative_kelvin
    Given that I am on "/"
    When I fill "-10" in {value}
    And I select "k-to-c" in {type}
    And I click on {convertBtn}
    Then I see {errorBlock} contains "Температура в Кельвинах не может быть отрицательной"

  Scenario: Below absolute zero Celsius
  Variant: below_absolute_zero_celsius
    Given that I am on "/"
    When I fill "-300" in {value}
    And I select "c-to-f" in {type}
    And I click on {convertBtn}
    Then I see {errorBlock} contains "Температура ниже абсолютного нуля"

  Scenario: Below absolute zero Fahrenheit
  Variant: below_absolute_zero_fahrenheit
    Given that I am on "/"
    When I fill "-500" in {value}
    And I select "f-to-c" in {type}
    And I click on {convertBtn}
    Then I see {errorBlock} contains "Температура ниже абсолютного нуля"

#      История (4)
  Scenario: Result added to history
  Variant: result_added
    Given that I am on "/"
    When I fill "100" in {value}
    And I select "m-to-km" in {type}
    And I click on {convertBtn}
    Then I see "0,1"

  Scenario: Multiple conversions
  Variant: three_conversions
    Given that I am on "/"
    When I fill "5" in {value}
    And I select "kg-to-g" in {type}
    And I click on {convertBtn}
    And I fill "100" in {value}
    And I select "c-to-f" in {type}
    And I click on {convertBtn}
    And I fill "1" in {value}
    And I select "km-to-m" in {type}
    And I click on {convertBtn}
    Then I see "5 кг = 5000 г"
    And I see "100 C = 212 F"
    And I see "1 км = 1000 м"

  Scenario: Clear history
  Variant: history_cleared
    Given that I am on "/"
    When I fill "1" in {value}
    And I select "km-to-m" in {type}
    And I click on {convertBtn}
    And I click on {clearHistoryBtn}
    And I wait for 2 seconds
    Then I don't see "1 км = 1000 м"

  Scenario: Error not added to history
  Variant: invalid_input_skipped
    Given that I am on "/"
    When I fill "abc" in {value}
    And I select "kg-to-g" in {type}
    And I click on {convertBtn}
    Then I see "Введите корректное числовое значение"
    And I don't see "abc кг"