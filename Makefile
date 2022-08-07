# ===========
#  Interface
# ===========

RESET        := $(shell tput -Txterm sgr0)
YELLOW       := $(shell tput -Txterm setab 3 && tput -Txterm setaf 0)
YELLOW_TEXT  := $(shell tput -Txterm setaf 3)
PURPLE       := $(shell tput -Txterm setab 5 && tput -Txterm setaf 7)
PURPLE_TEXT  := $(shell tput -Txterm setaf 5)

# ===========
#  Configure
# ===========

.EXPORT_ALL_VARIABLES:
APP_BUILD_SHA = $(shell git rev-parse --short HEAD)

apply-dev apply-staging: STEP_NAME=APPLY
preview-dev preview-staging: STEP_NAME=PREVIEW

# Dev
apply-dev preview-dev: ENV_NAME = dev
apply-dev preview-dev: OVERLAYS_DIR = manifests/overlays/dev
apply-dev preview-dev: IMAGE_TAG = dev-$(APP_BUILD_SHA)
apply-dev preview-dev: INGRESS_HOSTNAME = architecture-review.dev.cloudkube.io

# Staging
apply-staging preview-staging: ENV_NAME = staging
apply-staging preview-staging: OVERLAYS_DIR = manifests/overlays/staging
apply-staging preview-staging: IMAGE_TAG = staging-$(APP_BUILD_SHA)
apply-staging preview-staging: INGRESS_HOSTNAME = architecture-review.staging.cloudkube.io

# ==========
#  Commands
# ==========

preview-dev preview-staging: purple-heading debug-vars preview
apply-dev: use-dev-cluster yellow-heading debug-vars apply
apply-staging: use-staging-cluster yellow-heading debug-vars apply

# build YAML from kustomize overlays

preview:
	@echo "kustomize build $$OVERLAYS_DIR | envsubst"
	@echo "${RESET}"
	@kustomize build $$OVERLAYS_DIR | envsubst

# kubectl apply

apply:
	@echo "kustomize build $$OVERLAYS_DIR | envsubst | kubectl apply -f -"
	@echo "${RESET}"
	@kustomize build $$OVERLAYS_DIR | envsubst | kubectl apply -f -

# =========
#  Helpers
# =========

yellow-heading:
	@echo ""
	@echo "${YELLOW} $$STEP_NAME - $$ENV_NAME ${RESET}"
	@echo "${YELLOW_TEXT}"

purple-heading:
	@echo ""
	@echo "${PURPLE} $$STEP_NAME - $$ENV_NAME ${RESET}"
	@echo "${PURPLE_TEXT}"

debug-vars:
	@echo "APP_BUILD_SHA:     $$APP_BUILD_SHA"
	@echo "ENV_NAME:          $$ENV_NAME"
	@echo "IMAGE_TAG:         $$IMAGE_TAG"
	@echo "INGRESS_HOSTNAME:  $$INGRESS_HOSTNAME"
	@echo "OVERLAYS_DIR:      $$OVERLAYS_DIR"
	@echo ""
