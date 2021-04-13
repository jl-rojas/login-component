Feature: visita al sitio web
    Los usuarios al ingresar a la página web necesitan ver diferentes elementos ui cuando han iniciado sesión o no
    Scenario Outline: Usuario con cuenta
        Given el usuario tiene cuenta con una sesión "<status>"
        When visita el sitio web
        Then el sitio web muestra "<ui>"

        Examples:
            | status   | ui              |
            | activa   | dropdown        |
            | inactiva | login component |

    Scenario: Usuario sin cuenta interesado en la oferta de valor
        Given soy una persona nueva en la plataforma
        When ingreso al sitio web
        Then mostrar login component
