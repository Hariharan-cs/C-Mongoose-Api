using namespace std;
#include "mongoose.h"
#include<string>
#include <cpr/cpr.h>
#include <iostream>
#include <cpprest/base_uri.h>

static const char* s_http_port = "57954";
static struct mg_serve_http_opts s_http_server_opts;

static void GetRequestedDetails(struct mg_connection* nc, struct http_message* hm) {
	
	const std::string urimain = hm->uri.p;

	int val =0;
	const char* queryString = hm->query_string.p;
	for (int i = 0; i < strlen(queryString); i++) {
		if (queryString[i] == '}')
			val = i;
	}
	string FilteredData(queryString);
	
	string uriQuery;
		for (int j = 0; j < hm->query_string.len; j++) {
			uriQuery.push_back(FilteredData[j]);
		}

	mg_printf
	(
		nc, "%s",
		"HTTP/1.1 200 OK\r\n"
		"Access-Control-Allow-Headers: *\r\n"
		"Access-Control-Allow-Origin: *\r\n"
		"Transfer-Encoding: chunked\r\n\r\n"
	);

	string superHeroUri("https://superheroapi.com/api/1504777693003224/");
	string params(uriQuery);

	superHeroUri = superHeroUri + params;
	auto r = cpr::Get(cpr::Url{ superHeroUri });
	std::string str = r.text;
	const char* jsonText = str.c_str();

	mg_printf_http_chunk(nc, "{ \"results\": %s }", jsonText);
	mg_send_http_chunk(nc, "", 0); /* Send empty chunk, the end of response */
}

static void ev_handler(struct mg_connection* nc, int ev, void* ev_data) {
	struct http_message* hm = (struct http_message*) ev_data;
	switch (ev) {
	case MG_EV_HTTP_REQUEST:
		if (mg_vcmp(&hm->uri, "/api/superHero/specificSuperHero") == 0) {
			GetRequestedDetails(nc, hm); /* Handle RESTful call */
		}
		break;
	default:
		break;
	}
}

int main(int argc, char* argv[]) {
	struct mg_mgr mgr;
	struct mg_connection* nc;
	struct mg_bind_opts bind_opts;
	int i;
	char* cp;
	const char* err_str;
	#if MG_ENABLE_SSL
	const char* ssl_cert = NULL;
	#endif

	mg_mgr_init(&mgr, NULL);

	/* Use current binary directory as document root */
	if (argc > 0 && ((cp = strrchr(argv[0], DIRSEP)) != NULL)) {
		*cp = '\0';
		s_http_server_opts.document_root = argv[0];
	}

	/* Set HTTP server options */
	memset(&bind_opts, 0, sizeof(bind_opts));
	bind_opts.error_string = &err_str;
	#if MG_ENABLE_SSL
	if (ssl_cert != NULL) {
		bind_opts.ssl_cert = ssl_cert;
	}
	#endif
	nc = mg_bind_opt(&mgr, s_http_port, ev_handler, bind_opts);
	if (nc == NULL) {
		fprintf(stderr, "Error starting server on port %s: %s\n", s_http_port,
			*bind_opts.error_string);
		exit(1);
	}

	mg_set_protocol_http_websocket(nc);
	s_http_server_opts.enable_directory_listing = "yes";

	printf("Server Started Successfully on port %s, serving %s\n", s_http_port,
		s_http_server_opts.document_root);
	for (;;) {
		mg_mgr_poll(&mgr, 1000);
	}
	mg_mgr_free(&mgr);

	return 0;
}
