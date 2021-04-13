Feature: acceder aplicaciones

    Scenario Outline: Un usuario de aplicación ha olvidado la url de una aplicación
        Given no recuerdo la url de "<app>"
        When entro a la sección de "<section>" en la página de marketing
        Then puedo ser redirigido a "<destination>"

        Examples:
            | app       | section      | destination      |
            | discourse | aplicaciones | tk.discourse.com |
            | mi perfil | Accounts     | editar perfil    |


    Scenario: Un usuario gestor de organización ha olvidado la url de una aplicación
        Given no recuerdo la url de la sección administrativa
        When entro a la sección de configuración de la aplicación en la página de marketing
        Then puedo ser redirigido a quitar acceso
        And eliminar a un usuario despedido de la empresa


    Scenario: Esconder enlace a App Administrativa a usuarios que no tienen el rol gestor de organización
        Given que soy usuario gestor quiero limitar el acceso a un usuario básico
        When el usuario básico quiera ver la configuración de la organización
        Then se esconde el enlace a la página administrativa