package main

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

type ContactDetails struct {
	Email   string
	Subject string
	Message string
}

func main() {
	tmpl := template.Must(template.ParseFiles("poll.html"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			tmpl.Execute(w, nil)
			return
		}

		details := ContactDetails{
			Email: r.FormValue("question"),

			Subject: r.FormValue("opt1"),
			Message: r.FormValue("opt2"),
		}
		options := []string{
			details.Email, details.Subject, details.Message}

		answer := strings.Join(options, "\" \"")

		/* answer := fmt.Sprintf("/easypoll \"%s\" \"%s\" \"%s\"", details.Email, details.Subject, details.Message) */
		fmt.Print("/easypoll \"", answer, "\"")

		// do something with details
		_ = details

		tmpl.Execute(w, struct{ Success bool }{true})
	})

	http.ListenAndServe(":8080", nil)
}
