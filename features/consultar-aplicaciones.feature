Feature: consultar aplicaciones
    Los clientes de viaducto necesitan saber a qué cosas tienen acceso

    Scenario Outline: Un cliente no ha pagado cierto producto
        Given no he pagado "<product>"
        When abro el dropdown para ver mis aplicaciones
        Then las aplicaciones "<disabled_apps>" están deshabilitadas

        Examples:
            | product | disabled_apps |
            | zendesk | zendesk       |
            | Full    | all           |

    Scenario Outline: Open dropdown to see my apps list
        Given I have a "<plan>" subscription
        When I open the dropdown to see my apps list
        Then I should see "<apps>"

        Examples:
            | plan | apps      |
            | Free | discourse |
            | Full | all       |