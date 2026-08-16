# Mapa de Dependências — Próximo Estágio V2

> Ordem: dos arquivos base (sem dependências internas) até os mais dependentes (pages e app).
> Arquivos `index.ts` são omitidos — eles apenas re-exportam o arquivo principal da pasta.
> Arquivos `*.types.ts` são incluídos somente quando possuem dependências relevantes.

---

## shared/types/

`shared/types/ common.types.ts`
- Sem dependências internas

`shared/types/ api.types.ts`
- Sem dependências internas

---

## shared/constants/

`shared/constants/ routes.ts`
- Sem dependências internas

`shared/constants/ documentDefaults.ts`
- Sem dependências internas

---

## shared/stores/

`shared/stores/ accessibilityStore.ts`
- Sem dependências internas

`shared/stores/ themeStore.ts`
- Sem dependências internas

---

## shared/utils/

`shared/utils/ formatters.ts`
- Sem dependências internas

`shared/utils/ validators.ts`
- Sem dependências internas

`shared/utils/ csvParser.ts`
* `shared/types/ common.types.ts`

---

## shared/errors/

`shared/errors/ AppError.ts`
- Sem dependências internas

`shared/errors/ ApiError.ts`
* `shared/errors/ AppError.ts`

`shared/errors/ ValidationError.ts`
* `shared/errors/ AppError.ts`

`shared/errors/ BusinessRuleError.ts`
* `shared/errors/ AppError.ts`

`shared/errors/ NetworkError.ts`
* `shared/errors/ AppError.ts`

`shared/errors/ UnauthorizedError.ts`
* `shared/errors/ ApiError.ts`

`shared/errors/ NotFoundError.ts`
* `shared/errors/ ApiError.ts`

`shared/errors/ ErrorBoundary.tsx`
- Sem dependências internas

`shared/errors/ errorHandler.ts`
* `shared/errors/ AppError.ts`
* `shared/errors/ ApiError.ts`
* `shared/errors/ ValidationError.ts`
* `shared/errors/ BusinessRuleError.ts`
* `shared/errors/ NetworkError.ts`
* `shared/errors/ UnauthorizedError.ts`
* `shared/errors/ NotFoundError.ts`
* `shared/constants/ routes.ts`

`shared/errors/ useErrorHandler.ts`
* `shared/errors/ errorHandler.ts`
* `shared/errors/ AppError.ts`

---

## shared/api/

`shared/api/ apiConfig.ts`
- Sem dependências internas

`shared/api/ endpoints.ts`
- Sem dependências internas

`shared/api/ apiClient.ts`
* `shared/api/ apiConfig.ts`
* `shared/api/ endpoints.ts`
* `shared/errors/ ApiError.ts`
* `shared/errors/ UnauthorizedError.ts`
* `shared/errors/ NotFoundError.ts`
* `shared/errors/ NetworkError.ts`

`shared/api/ queryClient.ts`
* `shared/errors/ errorHandler.ts`
* `shared/constants/ routes.ts`

---

## shared/hooks/

`shared/hooks/ useLocalStorage.ts`
- Sem dependências internas

`shared/hooks/ usePagination.ts`
- Sem dependências internas

`shared/hooks/ usePopup.ts`
- Sem dependências internas

`shared/hooks/ useAccessibility.ts`
* `shared/stores/ accessibilityStore.ts`

`shared/hooks/ useDarkMode.ts`
* `shared/stores/ themeStore.ts`

---

## design-system/tokens/

`tokens/ colors.ts`
- Sem dependências internas

`tokens/ typography.ts`
- Sem dependências internas

`tokens/ spacing.ts`
- Sem dependências internas

`tokens/ shadows.ts`
- Sem dependências internas

`tokens/ breakpoints.ts`
- Sem dependências internas

---

## design-system/atoms/

`atoms/Button/ Button.types.ts`
- Sem dependências internas

`atoms/Button/ Button.tsx`
* `atoms/Button/ Button.types.ts`

`atoms/Input/ Input.types.ts`
- Sem dependências internas

`atoms/Input/ Input.tsx`
* `atoms/Input/ Input.types.ts`

`atoms/Textarea/ Textarea.tsx`
- Sem dependências internas

`atoms/Select/ Select.tsx`
- Sem dependências internas

`atoms/Checkbox/ Checkbox.types.ts`
- Sem dependências internas

`atoms/Checkbox/ Checkbox.tsx`
* `atoms/Checkbox/ Checkbox.types.ts`

`atoms/Icon/ Icon.types.ts`
- Sem dependências internas

`atoms/Icon/ Icon.tsx`
* `atoms/Icon/ Icon.types.ts`

`atoms/Avatar/ Avatar.types.ts`
- Sem dependências internas

`atoms/Avatar/ Avatar.tsx`
* `atoms/Avatar/ Avatar.types.ts`

`atoms/Badge/ Badge.types.ts`
- Sem dependências internas

`atoms/Badge/ Badge.tsx`
* `atoms/Badge/ Badge.types.ts`

`atoms/ProgressBar/ ProgressBar.types.ts`
- Sem dependências internas

`atoms/ProgressBar/ ProgressBar.tsx`
* `atoms/ProgressBar/ ProgressBar.types.ts`

`atoms/Skeleton/ Skeleton.tsx`
- Sem dependências internas

---

## design-system/molecules/

`molecules/FormField/ FormField.types.ts`
- Sem dependências internas

`molecules/FormField/ FormField.tsx`
* `atoms/Input/ Input.tsx`
* `atoms/Select/ Select.tsx`
* `atoms/Textarea/ Textarea.tsx`
* `molecules/FormField/ FormField.types.ts`

`molecules/ControlledField/ ControlledField.types.ts`
- Sem dependências internas

`molecules/ControlledField/ ControlledField.tsx`
* `molecules/ControlledField/ ControlledField.types.ts`

`molecules/FileUploadButton/ FileUploadButton.types.ts`
- Sem dependências internas

`molecules/FileUploadButton/ FileUploadButton.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FileUploadButton/ FileUploadButton.types.ts`

`molecules/NavLink/ NavLink.tsx`
* `atoms/Icon/ Icon.tsx`

`molecules/SectionHeader/ SectionHeader.types.ts`
- Sem dependências internas

`molecules/SectionHeader/ SectionHeader.tsx`
* `atoms/Icon/ Icon.tsx`
* `molecules/SectionHeader/ SectionHeader.types.ts`

`molecules/PaginationControls/ PaginationControls.types.ts`
- Sem dependências internas

`molecules/PaginationControls/ PaginationControls.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/PaginationControls/ PaginationControls.types.ts`

`molecules/ProfileSummary/ ProfileSummary.tsx`
- Sem dependências internas

`molecules/DateField/ DateField.tsx`
* `atoms/Input/ Input.tsx`
* `atoms/Button/ Button.tsx`

`molecules/CheckboxGroup/ CheckboxGroup.types.ts`
- Sem dependências internas

`molecules/CheckboxGroup/ CheckboxGroup.tsx`
* `atoms/Checkbox/ Checkbox.tsx`
* `molecules/CheckboxGroup/ CheckboxGroup.types.ts`

---

## design-system/organisms/

`organisms/AppNavBar/ AppNavBar.types.ts`
- Sem dependências internas

`organisms/AppNavBar/ AppNavBar.tsx`
* `atoms/Icon/ Icon.tsx`
* `atoms/Avatar/ Avatar.tsx`
* `molecules/NavLink/ NavLink.tsx`
* `molecules/ProfileSummary/ ProfileSummary.tsx`
* `organisms/AppNavBar/ AppNavBar.types.ts`

`organisms/Modal/ Modal.types.ts`
- Sem dependências internas

`organisms/Modal/ Modal.tsx`
* `organisms/Modal/ Modal.types.ts`

`organisms/DataTable/ DataTable.types.ts`
- Sem dependências internas

`organisms/DataTable/ DataTable.tsx`
* `atoms/Skeleton/ Skeleton.tsx`
* `molecules/PaginationControls/ PaginationControls.tsx`
* `shared/hooks/ usePagination.ts`
* `organisms/DataTable/ DataTable.types.ts`

`organisms/FilterPanel/ FilterPanel.types.ts`
- Sem dependências internas

`organisms/FilterPanel/ FilterPanel.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `organisms/FilterPanel/ FilterPanel.types.ts`

`organisms/AccessibilityMenu/ AccessibilityMenu.tsx`
* `atoms/Button/ Button.tsx`
* `shared/stores/ accessibilityStore.ts`
* `shared/hooks/ useAccessibility.ts`

`organisms/NotificationBell/ NotificationBell.types.ts`
- Sem dependências internas

`organisms/NotificationBell/ NotificationBell.tsx`
* `atoms/Icon/ Icon.tsx`
* `atoms/Badge/ Badge.tsx`
* `organisms/NotificationBell/ NotificationBell.types.ts`

`organisms/DashboardStatCard/ DashboardStatCard.types.ts`
- Sem dependências internas

`organisms/DashboardStatCard/ DashboardStatCard.tsx`
* `atoms/ProgressBar/ ProgressBar.tsx`
* `organisms/DashboardStatCard/ DashboardStatCard.types.ts`

---

## design-system/templates/

`templates/AuthLayout/ AuthLayout.tsx`
- Sem dependências internas

`templates/PageLayout/ PageLayout.tsx`
* `organisms/Modal/ Modal.tsx`
* `shared/errors/ ErrorBoundary.tsx`

---

## features/status/

`status/types/ status.types.ts`
- Sem dependências internas

`status/domain/ statusRules.ts`
* `status/types/ status.types.ts`
* `atoms/Icon/ Icon.types.ts`

`status/components/StatusIcon/ StatusIcon.types.ts`
* `status/types/ status.types.ts`

`status/components/StatusIcon/ StatusIcon.tsx`
* `atoms/Icon/ Icon.tsx`
* `status/types/ status.types.ts`
* `status/domain/ statusRules.ts`

`status/components/StatusFilterGroup/ StatusFilterGroup.types.ts`
* `status/types/ status.types.ts`

`status/components/StatusFilterGroup/ StatusFilterGroup.tsx`
* `atoms/Checkbox/ Checkbox.tsx`
* `status/types/ status.types.ts`

---

## features/tipo/

`tipo/types/ tipo.types.ts`
- Sem dependências internas

`tipo/domain/ tipoRules.ts`
* `tipo/types/ tipo.types.ts`

`tipo/domain/ tipoValidation.ts`
* `tipo/types/ tipo.types.ts`

`tipo/services/ tipoService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `tipo/types/ tipo.types.ts`

`tipo/hooks/ queryKeys.ts`
- Sem dependências internas

`tipo/hooks/ useTipos.ts`
* `tipo/services/ tipoService.ts`
* `tipo/hooks/ queryKeys.ts`
* `tipo/types/ tipo.types.ts`

`tipo/hooks/ useTipoManagement.ts`
* `tipo/services/ tipoService.ts`
* `tipo/hooks/ queryKeys.ts`
* `tipo/types/ tipo.types.ts`
* `shared/errors/ useErrorHandler.ts`

`tipo/components/TipoSelect/ TipoSelect.types.ts`
* `tipo/types/ tipo.types.ts`

`tipo/components/TipoSelect/ TipoSelect.tsx`
* `atoms/Select/ Select.tsx`
* `tipo/hooks/ useTipos.ts`
* `tipo/types/ tipo.types.ts`

`tipo/components/TipoFilterGroup/ TipoFilterGroup.types.ts`
* `tipo/types/ tipo.types.ts`

`tipo/components/TipoFilterGroup/ TipoFilterGroup.tsx`
* `molecules/CheckboxGroup/ CheckboxGroup.tsx`
* `tipo/hooks/ useTipos.ts`
* `tipo/types/ tipo.types.ts`

`tipo/components/TipoList/ TipoList.types.ts`
* `tipo/types/ tipo.types.ts`

`tipo/components/TipoList/ TipoList.tsx`
* `atoms/Button/ Button.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `tipo/hooks/ useTipoManagement.ts`
* `tipo/types/ tipo.types.ts`

`tipo/components/TipoCreateForm/ TipoCreateForm.types.ts`
- Sem dependências internas

`tipo/components/TipoCreateForm/ TipoCreateForm.tsx`
* `atoms/Input/ Input.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `tipo/domain/ tipoValidation.ts`
* `tipo/hooks/ useTipoManagement.ts`

---

## features/feedback/

`feedback/types/ feedback.types.ts`
* `status/types/ status.types.ts`

`feedback/domain/ feedbackValidation.ts`
- Sem dependências internas

`feedback/components/FeedbackInput/ FeedbackInput.types.ts`
- Sem dependências internas

`feedback/components/FeedbackInput/ FeedbackInput.tsx`
* `atoms/Textarea/ Textarea.tsx`

`feedback/components/FeedbackDisplay/ FeedbackDisplay.types.ts`
* `status/types/ status.types.ts`
* `feedback/types/ feedback.types.ts`

`feedback/components/FeedbackDisplay/ FeedbackDisplay.tsx`
* `status/types/ status.types.ts`
* `feedback/types/ feedback.types.ts`

---

## features/validacao/

`validacao/types/ validacao.types.ts`
* `status/types/ status.types.ts`
* `feedback/types/ feedback.types.ts`

`validacao/domain/ validacaoRules.ts`
* `validacao/types/ validacao.types.ts`
* `status/types/ status.types.ts`

`validacao/domain/ validacaoValidation.ts`
* `status/types/ status.types.ts`

`validacao/services/ validacaoService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `shared/errors/ BusinessRuleError.ts`
* `validacao/types/ validacao.types.ts`

`validacao/hooks/ queryKeys.ts`
- Sem dependências internas

`validacao/hooks/ useDocumentReview.ts`
* `validacao/services/ validacaoService.ts`
* `validacao/domain/ validacaoRules.ts`
* `validacao/hooks/ queryKeys.ts`
* `documento/hooks/ queryKeys.ts`
* `shared/hooks/ usePopup.ts`
* `shared/errors/ useErrorHandler.ts`
* `auth/store/ authStore.ts`

`validacao/components/ValidacaoActions/ ValidacaoActions.types.ts`
- Sem dependências internas

`validacao/components/ValidacaoActions/ ValidacaoActions.tsx`
* `atoms/Button/ Button.tsx`

`validacao/components/DocumentReviewModal/ DocumentReviewModal.types.ts`
* `validacao/types/ validacao.types.ts`

`validacao/components/DocumentReviewModal/ DocumentReviewModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Button/ Button.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `feedback/components/FeedbackInput/ FeedbackInput.tsx`
* `validacao/components/ValidacaoActions/ ValidacaoActions.tsx`
* `validacao/hooks/ useDocumentReview.ts`
* `validacao/domain/ validacaoValidation.ts`

---

## features/prazo/

`prazo/types/ prazo.types.ts`
- Sem dependências internas

`prazo/domain/ prazoRules.ts`
* `prazo/types/ prazo.types.ts`

`prazo/domain/ prazoValidation.ts`
- Sem dependências internas

`prazo/services/ prazoService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `prazo/types/ prazo.types.ts`

`prazo/hooks/ queryKeys.ts`
- Sem dependências internas

`prazo/hooks/ useDeadlineManagement.ts`
* `prazo/services/ prazoService.ts`
* `prazo/hooks/ queryKeys.ts`
* `prazo/types/ prazo.types.ts`
* `shared/errors/ useErrorHandler.ts`

`prazo/hooks/ useDeadlineNotifications.ts`
* `prazo/types/ prazo.types.ts`
* `prazo/domain/ prazoRules.ts`
* `shared/hooks/ usePopup.ts`

`prazo/components/DeadlineEditorRow/ DeadlineEditorRow.types.ts`
* `prazo/types/ prazo.types.ts`

`prazo/components/DeadlineEditorRow/ DeadlineEditorRow.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/DateField/ DateField.tsx`
* `prazo/types/ prazo.types.ts`
* `prazo/domain/ prazoRules.ts`
* `prazo/domain/ prazoValidation.ts`
* `prazo/hooks/ useDeadlineManagement.ts`

`prazo/components/DeadlineEditorList/ DeadlineEditorList.types.ts`
* `prazo/types/ prazo.types.ts`

`prazo/components/DeadlineEditorList/ DeadlineEditorList.tsx`
* `atoms/Skeleton/ Skeleton.tsx`
* `prazo/components/DeadlineEditorRow/ DeadlineEditorRow.tsx`
* `prazo/hooks/ useDeadlineManagement.ts`
* `prazo/types/ prazo.types.ts`

`prazo/components/DeadlineNotificationModal/ DeadlineNotificationModal.types.ts`
* `prazo/types/ prazo.types.ts`

`prazo/components/DeadlineNotificationModal/ DeadlineNotificationModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Button/ Button.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `prazo/types/ prazo.types.ts`

`prazo/components/DeadlineListModal/ DeadlineListModal.types.ts`
* `prazo/types/ prazo.types.ts`

`prazo/components/DeadlineListModal/ DeadlineListModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `prazo/types/ prazo.types.ts`

---

## features/modelo/

`modelo/types/ modelo.types.ts`
- Sem dependências internas

`modelo/domain/ modeloRules.ts`
* `modelo/types/ modelo.types.ts`
* `shared/constants/ documentDefaults.ts`

`modelo/domain/ modeloValidation.ts`
- Sem dependências internas

`modelo/services/ modeloService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `modelo/types/ modelo.types.ts`

`modelo/hooks/ queryKeys.ts`
- Sem dependências internas

`modelo/hooks/ useModels.ts`
* `modelo/services/ modeloService.ts`
* `modelo/hooks/ queryKeys.ts`
* `modelo/types/ modelo.types.ts`

`modelo/hooks/ useModelUpload.ts`
* `modelo/services/ modeloService.ts`
* `modelo/hooks/ queryKeys.ts`
* `modelo/domain/ modeloValidation.ts`
* `shared/errors/ useErrorHandler.ts`

`modelo/hooks/ useModelDownload.ts`
* `modelo/services/ modeloService.ts`

`modelo/components/ModelCard/ ModelCard.types.ts`
* `modelo/types/ modelo.types.ts`

`modelo/components/ModelCard/ ModelCard.tsx`
* `atoms/Button/ Button.tsx`
* `modelo/types/ modelo.types.ts`
* `modelo/domain/ modeloRules.ts`

`modelo/components/ModelUploadModal/ ModelUploadModal.types.ts`
- Sem dependências internas

`modelo/components/ModelUploadModal/ ModelUploadModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Textarea/ Textarea.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/ControlledField/ ControlledField.tsx`
* `molecules/FileUploadButton/ FileUploadButton.tsx`
* `modelo/hooks/ useModelUpload.ts`
* `modelo/domain/ modeloValidation.ts`

`modelo/components/ModelDownloadSection/ ModelDownloadSection.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `modelo/components/ModelCard/ ModelCard.tsx`
* `modelo/hooks/ useModels.ts`
* `modelo/hooks/ useModelDownload.ts`
* `shared/constants/ documentDefaults.ts`

`modelo/components/ModelManagementSection/ ModelManagementSection.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `modelo/components/ModelCard/ ModelCard.tsx`
* `modelo/hooks/ useModels.ts`
* `shared/hooks/ usePopup.ts`

---

## features/documento/

`documento/types/ documento.types.ts`
* `status/types/ status.types.ts`
* `tipo/types/ tipo.types.ts`

`documento/domain/ documentoRules.ts`
* `documento/types/ documento.types.ts`
* `status/types/ status.types.ts`

`documento/domain/ documentoValidation.ts`
* `documento/types/ documento.types.ts`

`documento/services/ documentoService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `documento/types/ documento.types.ts`

`documento/hooks/ queryKeys.ts`
- Sem dependências internas

`documento/hooks/ useDocumentUpload.ts`
* `documento/services/ documentoService.ts`
* `documento/hooks/ queryKeys.ts`
* `documento/domain/ documentoRules.ts`
* `documento/domain/ documentoValidation.ts`
* `auth/store/ authStore.ts`
* `shared/errors/ useErrorHandler.ts`

`documento/hooks/ useStudentDocuments.ts`
* `documento/services/ documentoService.ts`
* `documento/hooks/ queryKeys.ts`
* `documento/domain/ documentoRules.ts`
* `auth/store/ authStore.ts`

`documento/hooks/ useProfessorDocuments.ts`
* `documento/services/ documentoService.ts`
* `documento/hooks/ queryKeys.ts`
* `documento/domain/ documentoRules.ts`
* `auth/store/ authStore.ts`

`documento/components/upload/DocumentNameInput/ DocumentNameInput.tsx`
* `atoms/Input/ Input.tsx`

`documento/components/upload/DocumentUploadForm/ DocumentUploadForm.types.ts`
- Sem dependências internas

`documento/components/upload/DocumentUploadForm/ DocumentUploadForm.tsx`
* `atoms/Textarea/ Textarea.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `molecules/ControlledField/ ControlledField.tsx`
* `molecules/FileUploadButton/ FileUploadButton.tsx`
* `tipo/components/TipoSelect/ TipoSelect.tsx`
* `documento/components/upload/DocumentNameInput/ DocumentNameInput.tsx`
* `documento/hooks/ useDocumentUpload.ts`
* `documento/domain/ documentoValidation.ts`

`documento/components/cards/DocumentCard/ DocumentCard.types.ts`
* `documento/types/ documento.types.ts`

`documento/components/cards/DocumentCard/ DocumentCard.tsx`
* `atoms/Button/ Button.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `feedback/components/FeedbackDisplay/ FeedbackDisplay.tsx`
* `documento/types/ documento.types.ts`

`documento/components/cards/LastDocumentCard/ LastDocumentCard.types.ts`
* `documento/types/ documento.types.ts`

`documento/components/cards/LastDocumentCard/ LastDocumentCard.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `documento/components/cards/DocumentCard/ DocumentCard.tsx`

`documento/components/lists/SentDocumentsList/ SentDocumentsList.types.ts`
* `documento/types/ documento.types.ts`

`documento/components/lists/SentDocumentsList/ SentDocumentsList.tsx`
* `documento/components/cards/DocumentCard/ DocumentCard.tsx`

`documento/components/lists/LatestDocumentsSection/ LatestDocumentsSection.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `documento/components/lists/SentDocumentsList/ SentDocumentsList.tsx`

`documento/components/lists/DocumentHistorySection/ DocumentHistorySection.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `documento/components/lists/SentDocumentsList/ SentDocumentsList.tsx`

`documento/components/lists/DocumentTable/ DocumentTable.types.ts`
* `documento/types/ documento.types.ts`

`documento/components/lists/DocumentTable/ DocumentTable.tsx`
* `organisms/DataTable/ DataTable.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `documento/types/ documento.types.ts`

`documento/components/filters/DocumentFilters/ DocumentFilters.types.ts`
* `status/types/ status.types.ts`
* `tipo/types/ tipo.types.ts`

`documento/components/filters/DocumentFilters/ DocumentFilters.tsx`
* `organisms/FilterPanel/ FilterPanel.tsx`
* `status/components/StatusFilterGroup/ StatusFilterGroup.tsx`
* `tipo/components/TipoFilterGroup/ TipoFilterGroup.tsx`

`documento/components/stats/DocumentStatsDashboard/ DocumentStatsDashboard.types.ts`
* `documento/types/ documento.types.ts`

`documento/components/stats/DocumentStatsDashboard/ DocumentStatsDashboard.tsx`
* `organisms/DashboardStatCard/ DashboardStatCard.tsx`
* `status/types/ status.types.ts`
* `documento/types/ documento.types.ts`

---

## features/auth/

`auth/types/ auth.types.ts`
* `shared/types/ common.types.ts`

`auth/store/ authStore.ts`
* `shared/types/ common.types.ts`

`auth/domain/ authRules.ts`
* `auth/types/ auth.types.ts`

`auth/domain/ loginValidation.ts`
- Sem dependências internas

`auth/domain/ profileValidation.ts`
- Sem dependências internas

`auth/services/ authService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `shared/errors/ ApiError.ts`
* `auth/types/ auth.types.ts`

`auth/hooks/ queryKeys.ts`
- Sem dependências internas

`auth/hooks/ useLogin.ts`
* `auth/services/ authService.ts`
* `auth/store/ authStore.ts`
* `shared/constants/ routes.ts`
* `shared/errors/ useErrorHandler.ts`

`auth/hooks/ useLogout.ts`
* `auth/services/ authService.ts`
* `auth/store/ authStore.ts`
* `shared/constants/ routes.ts`
* `shared/api/ queryClient.ts`

`auth/hooks/ useTokenVerification.ts`
* `auth/services/ authService.ts`
* `auth/store/ authStore.ts`
* `shared/constants/ routes.ts`
* `auth/hooks/ queryKeys.ts`

`auth/hooks/ useBaseProfile.ts`
* `auth/services/ authService.ts`
* `auth/store/ authStore.ts`
* `auth/types/ auth.types.ts`
* `auth/hooks/ queryKeys.ts`
* `shared/errors/ useErrorHandler.ts`

`auth/components/profile/AvatarUpload/ AvatarUpload.types.ts`
- Sem dependências internas

`auth/components/profile/AvatarUpload/ AvatarUpload.tsx`
* `atoms/Avatar/ Avatar.tsx`

`auth/components/profile/BaseProfileCard/ BaseProfileCard.types.ts`
- Sem dependências internas

`auth/components/profile/BaseProfileCard/ BaseProfileCard.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`

`auth/components/profile/BaseProfileView/ BaseProfileView.types.ts`
* `auth/types/ auth.types.ts`

`auth/components/profile/BaseProfileView/ BaseProfileView.tsx`
* `atoms/Button/ Button.tsx`
* `auth/types/ auth.types.ts`

`auth/components/profile/BaseProfileEditForm/ BaseProfileEditForm.types.ts`
* `auth/types/ auth.types.ts`

`auth/components/profile/BaseProfileEditForm/ BaseProfileEditForm.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `auth/types/ auth.types.ts`

`auth/components/LoginForm/ LoginForm.tsx`
* `atoms/Input/ Input.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `auth/domain/ loginValidation.ts`
* `auth/hooks/ useLogin.ts`

`auth/components/RecoverPasswordForm/ RecoverPasswordForm.tsx`
* `atoms/Input/ Input.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `auth/services/ authService.ts`
* `shared/errors/ useErrorHandler.ts`

---

## features/curso/

`curso/types/ curso.types.ts`
- Sem dependências internas

`curso/domain/ cursoRules.ts`
* `curso/types/ curso.types.ts`

`curso/domain/ cursoValidation.ts`
- Sem dependências internas

`curso/services/ cursoService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `curso/types/ curso.types.ts`

`curso/hooks/ queryKeys.ts`
- Sem dependências internas

`curso/hooks/ useCursos.ts`
* `curso/services/ cursoService.ts`
* `curso/hooks/ queryKeys.ts`
* `curso/types/ curso.types.ts`

`curso/hooks/ useCourseManagement.ts`
* `curso/services/ cursoService.ts`
* `curso/hooks/ queryKeys.ts`
* `curso/types/ curso.types.ts`
* `shared/errors/ useErrorHandler.ts`

`curso/components/CourseSelect/ CourseSelect.types.ts`
* `curso/types/ curso.types.ts`

`curso/components/CourseSelect/ CourseSelect.tsx`
* `atoms/Select/ Select.tsx`
* `molecules/ControlledField/ ControlledField.tsx`
* `curso/hooks/ useCursos.ts`
* `curso/types/ curso.types.ts`

`curso/components/CourseSelectorPanel/ CourseSelectorPanel.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `curso/components/CourseSelect/ CourseSelect.tsx`

`curso/components/CourseList/ CourseList.types.ts`
* `curso/types/ curso.types.ts`

`curso/components/CourseList/ CourseList.tsx`
* `atoms/Button/ Button.tsx`
* `curso/hooks/ useCourseManagement.ts`
* `curso/types/ curso.types.ts`

`curso/components/CourseCreateModal/ CourseCreateModal.types.ts`
- Sem dependências internas

`curso/components/CourseCreateModal/ CourseCreateModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Button/ Button.tsx`
* `atoms/Select/ Select.tsx`
* `molecules/FormField/ FormField.tsx`
* `molecules/ControlledField/ ControlledField.tsx`
* `curso/domain/ cursoRules.ts`
* `curso/domain/ cursoValidation.ts`
* `curso/hooks/ useCourseManagement.ts`

`curso/components/ReassignProfessorModal/ ReassignProfessorModal.types.ts`
- Sem dependências internas

`curso/components/ReassignProfessorModal/ ReassignProfessorModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Select/ Select.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/ControlledField/ ControlledField.tsx`
* `curso/hooks/ useCourseManagement.ts`

---

## features/professor/

`professor/types/ professor.types.ts`
- Sem dependências internas

`professor/domain/ professorRules.ts`
* `auth/types/ auth.types.ts`

`professor/services/ professorService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`

`professor/hooks/ useProfessorProfile.ts`
* `auth/hooks/ useBaseProfile.ts`
* `auth/domain/ profileValidation.ts`

`professor/components/ProfessorNavBar/ ProfessorNavBar.tsx`
* `organisms/AppNavBar/ AppNavBar.tsx`
* `atoms/Avatar/ Avatar.tsx`
* `molecules/ProfileSummary/ ProfileSummary.tsx`
* `professor/domain/ professorRules.ts`
* `auth/store/ authStore.ts`

`professor/components/profile/ProfessorProfileCard/ ProfessorProfileCard.tsx`
* `auth/components/profile/BaseProfileCard/ BaseProfileCard.tsx`
* `auth/components/profile/AvatarUpload/ AvatarUpload.tsx`
* `auth/store/ authStore.ts`
* `auth/hooks/ useLogout.ts`

`professor/components/profile/ProfessorProfileView/ ProfessorProfileView.tsx`
* `auth/components/profile/BaseProfileView/ BaseProfileView.tsx`

`professor/components/profile/ProfessorProfileEditForm/ ProfessorProfileEditForm.tsx`
* `auth/components/profile/BaseProfileEditForm/ BaseProfileEditForm.tsx`
* `auth/domain/ profileValidation.ts`
* `professor/hooks/ useProfessorProfile.ts`

---

## features/admin/

`admin/types/ admin.types.ts`
- Sem dependências internas

`admin/domain/ adminRules.ts`
* `auth/types/ auth.types.ts`

`admin/domain/ professorValidation.ts`
- Sem dependências internas

`admin/domain/ secretariaValidation.ts`
- Sem dependências internas

`admin/services/ adminService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `admin/types/ admin.types.ts`

`admin/hooks/ queryKeys.ts`
- Sem dependências internas

`admin/hooks/ useAdminAccess.ts`
* `auth/store/ authStore.ts`
* `admin/domain/ adminRules.ts`
* `shared/constants/ routes.ts`

`admin/hooks/ useProfessorManagement.ts`
* `admin/services/ adminService.ts`
* `admin/hooks/ queryKeys.ts`
* `admin/types/ admin.types.ts`
* `curso/hooks/ queryKeys.ts`
* `shared/errors/ useErrorHandler.ts`

`admin/hooks/ useSecretariaManagement.ts`
* `admin/services/ adminService.ts`
* `admin/hooks/ queryKeys.ts`
* `admin/types/ admin.types.ts`
* `shared/errors/ useErrorHandler.ts`

`admin/hooks/ useAdminProfile.ts`
* `auth/hooks/ useBaseProfile.ts`
* `auth/domain/ profileValidation.ts`

`admin/components/AdminNavBar/ AdminNavBar.tsx`
* `organisms/AppNavBar/ AppNavBar.tsx`
* `atoms/Avatar/ Avatar.tsx`
* `molecules/ProfileSummary/ ProfileSummary.tsx`
* `auth/store/ authStore.ts`

`admin/components/professor-management/ProfessorList/ ProfessorList.types.ts`
* `admin/types/ admin.types.ts`

`admin/components/professor-management/ProfessorList/ ProfessorList.tsx`
* `atoms/Button/ Button.tsx`
* `admin/hooks/ useProfessorManagement.ts`
* `admin/types/ admin.types.ts`

`admin/components/professor-management/ProfessorCreateModal/ ProfessorCreateModal.types.ts`
- Sem dependências internas

`admin/components/professor-management/ProfessorCreateModal/ ProfessorCreateModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Select/ Select.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `molecules/ControlledField/ ControlledField.tsx`
* `curso/components/CourseSelect/ CourseSelect.tsx`
* `admin/domain/ professorValidation.ts`
* `admin/hooks/ useProfessorManagement.ts`

`admin/components/secretaria-management/SecretariaList/ SecretariaList.types.ts`
* `admin/types/ admin.types.ts`

`admin/components/secretaria-management/SecretariaList/ SecretariaList.tsx`
* `atoms/Button/ Button.tsx`
* `admin/hooks/ useSecretariaManagement.ts`
* `admin/types/ admin.types.ts`

`admin/components/secretaria-management/SecretariaCreateModal/ SecretariaCreateModal.types.ts`
- Sem dependências internas

`admin/components/secretaria-management/SecretariaCreateModal/ SecretariaCreateModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `admin/domain/ secretariaValidation.ts`
* `admin/hooks/ useSecretariaManagement.ts`

`admin/components/profile/AdminProfileCard/ AdminProfileCard.tsx`
* `auth/components/profile/BaseProfileCard/ BaseProfileCard.tsx`
* `auth/components/profile/AvatarUpload/ AvatarUpload.tsx`
* `auth/store/ authStore.ts`
* `auth/hooks/ useLogout.ts`

`admin/components/profile/AdminProfileView/ AdminProfileView.tsx`
* `auth/components/profile/BaseProfileView/ BaseProfileView.tsx`

`admin/components/profile/AdminProfileEditForm/ AdminProfileEditForm.tsx`
* `auth/components/profile/BaseProfileEditForm/ BaseProfileEditForm.tsx`
* `auth/domain/ profileValidation.ts`
* `admin/hooks/ useAdminProfile.ts`

---

## features/secretaria/

`secretaria/types/ secretaria.types.ts`
- Sem dependências internas

`secretaria/domain/ secretariaRules.ts`
* `secretaria/types/ secretaria.types.ts`

`secretaria/services/ secretariaService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `secretaria/types/ secretaria.types.ts`

`secretaria/hooks/ queryKeys.ts`
- Sem dependências internas

`secretaria/hooks/ useConcludedStudents.ts`
* `secretaria/services/ secretariaService.ts`
* `secretaria/hooks/ queryKeys.ts`
* `secretaria/domain/ secretariaRules.ts`
* `secretaria/types/ secretaria.types.ts`

`secretaria/hooks/ useSecretariaProfile.ts`
* `auth/hooks/ useBaseProfile.ts`
* `auth/domain/ profileValidation.ts`

`secretaria/components/SecretariaNavBar/ SecretariaNavBar.tsx`
* `organisms/AppNavBar/ AppNavBar.tsx`
* `molecules/ProfileSummary/ ProfileSummary.tsx`
* `auth/store/ authStore.ts`
* `auth/hooks/ useLogout.ts`

`secretaria/components/StudentDocumentsExpander/ StudentDocumentsExpander.types.ts`
* `secretaria/types/ secretaria.types.ts`

`secretaria/components/StudentDocumentsExpander/ StudentDocumentsExpander.tsx`
* `atoms/Button/ Button.tsx`
* `documento/components/cards/DocumentCard/ DocumentCard.tsx`
* `secretaria/types/ secretaria.types.ts`

`secretaria/components/ConcludedStudentTable/ ConcludedStudentTable.types.ts`
* `secretaria/types/ secretaria.types.ts`

`secretaria/components/ConcludedStudentTable/ ConcludedStudentTable.tsx`
* `organisms/DataTable/ DataTable.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `secretaria/components/StudentDocumentsExpander/ StudentDocumentsExpander.tsx`
* `secretaria/hooks/ useConcludedStudents.ts`

`secretaria/components/profile/SecretariaProfileCard/ SecretariaProfileCard.tsx`
* `auth/components/profile/BaseProfileCard/ BaseProfileCard.tsx`
* `auth/components/profile/AvatarUpload/ AvatarUpload.tsx`
* `auth/store/ authStore.ts`
* `auth/hooks/ useLogout.ts`

`secretaria/components/profile/SecretariaProfileView/ SecretariaProfileView.tsx`
* `auth/components/profile/BaseProfileView/ BaseProfileView.tsx`

`secretaria/components/profile/SecretariaProfileEditForm/ SecretariaProfileEditForm.tsx`
* `auth/components/profile/BaseProfileEditForm/ BaseProfileEditForm.tsx`
* `auth/domain/ profileValidation.ts`
* `secretaria/hooks/ useSecretariaProfile.ts`

---

## features/aluno/

`aluno/types/ aluno.types.ts`
- Sem dependências internas

`aluno/domain/ alunoRules.ts`
* `aluno/types/ aluno.types.ts`
* `shared/utils/ validators.ts`

`aluno/domain/ alunoValidation.ts`
* `aluno/types/ aluno.types.ts`
* `aluno/domain/ alunoRules.ts`

`aluno/domain/ csvRules.ts`
* `aluno/types/ aluno.types.ts`
* `aluno/domain/ alunoRules.ts`
* `shared/utils/ csvParser.ts`
* `shared/utils/ validators.ts`

`aluno/services/ alunoService.ts`
* `shared/api/ apiClient.ts`
* `shared/api/ endpoints.ts`
* `aluno/types/ aluno.types.ts`

`aluno/hooks/ queryKeys.ts`
- Sem dependências internas

`aluno/hooks/ useStudentList.ts`
* `aluno/services/ alunoService.ts`
* `aluno/hooks/ queryKeys.ts`
* `aluno/types/ aluno.types.ts`
* `auth/store/ authStore.ts`
* `shared/hooks/ usePagination.ts`

`aluno/hooks/ useCSVImport.ts`
* `aluno/services/ alunoService.ts`
* `aluno/hooks/ queryKeys.ts`
* `aluno/domain/ csvRules.ts`
* `aluno/types/ aluno.types.ts`
* `shared/errors/ useErrorHandler.ts`

`aluno/hooks/ useStudentRegistration.ts`
* `aluno/services/ alunoService.ts`
* `aluno/hooks/ queryKeys.ts`
* `aluno/domain/ alunoValidation.ts`
* `auth/store/ authStore.ts`
* `shared/errors/ useErrorHandler.ts`

`aluno/hooks/ useStudentDetail.ts`
* `aluno/services/ alunoService.ts`
* `aluno/hooks/ queryKeys.ts`
* `aluno/types/ aluno.types.ts`

`aluno/hooks/ useConcludeStudent.ts`
* `aluno/services/ alunoService.ts`
* `aluno/hooks/ queryKeys.ts`
* `shared/errors/ useErrorHandler.ts`

`aluno/hooks/ useStudentProgress.ts`
* `documento/services/ documentoService.ts`
* `documento/hooks/ queryKeys.ts`
* `auth/store/ authStore.ts`

`aluno/hooks/ useStudentProfile.ts`
* `auth/hooks/ useBaseProfile.ts`
* `auth/domain/ profileValidation.ts`

`aluno/components/progress/DeliveryProgressTracker/ DeliveryProgressTracker.types.ts`
- Sem dependências internas

`aluno/components/progress/DeliveryProgressTracker/ DeliveryProgressTracker.tsx`
* `atoms/ProgressBar/ ProgressBar.tsx`

`aluno/components/management/StudentTable/ StudentTable.types.ts`
* `aluno/types/ aluno.types.ts`

`aluno/components/management/StudentTable/ StudentTable.tsx`
* `organisms/DataTable/ DataTable.tsx`
* `status/components/StatusIcon/ StatusIcon.tsx`
* `aluno/types/ aluno.types.ts`

`aluno/components/management/StudentFilters/ StudentFilters.types.ts`
- Sem dependências internas

`aluno/components/management/StudentFilters/ StudentFilters.tsx`
* `atoms/Input/ Input.tsx`
* `atoms/Button/ Button.tsx`

`aluno/components/management/CSVImportSection/CSVImportButton/ CSVImportButton.tsx`
* `atoms/Button/ Button.tsx`

`aluno/components/management/CSVImportSection/CSVPreviewTable/ CSVPreviewTable.types.ts`
* `aluno/types/ aluno.types.ts`

`aluno/components/management/CSVImportSection/CSVPreviewTable/ CSVPreviewTable.tsx`
* `atoms/Button/ Button.tsx`
* `shared/utils/ validators.ts`
* `aluno/types/ aluno.types.ts`

`aluno/components/management/CSVImportSection/ CSVImportSection.tsx`
* `aluno/components/management/CSVImportSection/CSVImportButton/ CSVImportButton.tsx`
* `aluno/components/management/CSVImportSection/CSVPreviewTable/ CSVPreviewTable.tsx`
* `aluno/hooks/ useCSVImport.ts`

`aluno/components/management/StudentRegistrationModal/ StudentRegistrationModal.types.ts`
- Sem dependências internas

`aluno/components/management/StudentRegistrationModal/ StudentRegistrationModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Button/ Button.tsx`
* `molecules/FormField/ FormField.tsx`
* `molecules/ControlledField/ ControlledField.tsx`
* `curso/components/CourseSelect/ CourseSelect.tsx`
* `aluno/domain/ alunoValidation.ts`
* `aluno/hooks/ useStudentRegistration.ts`

`aluno/components/detail/StudentProfileSection/ StudentProfileSection.types.ts`
* `aluno/types/ aluno.types.ts`

`aluno/components/detail/StudentProfileSection/ StudentProfileSection.tsx`
* `atoms/Avatar/ Avatar.tsx`
* `molecules/SectionHeader/ SectionHeader.tsx`
* `aluno/types/ aluno.types.ts`

`aluno/components/detail/ConcludeStudentButton/ ConcludeStudentButton.types.ts`
- Sem dependências internas

`aluno/components/detail/ConcludeStudentButton/ ConcludeStudentButton.tsx`
* `atoms/Button/ Button.tsx`
* `aluno/hooks/ useConcludeStudent.ts`

`aluno/components/profile/StudentProfileCard/ StudentProfileCard.tsx`
* `auth/components/profile/BaseProfileCard/ BaseProfileCard.tsx`
* `auth/components/profile/AvatarUpload/ AvatarUpload.tsx`
* `auth/store/ authStore.ts`
* `auth/hooks/ useLogout.ts`

`aluno/components/profile/StudentProfileView/ StudentProfileView.tsx`
* `auth/components/profile/BaseProfileView/ BaseProfileView.tsx`

`aluno/components/profile/StudentProfileEditForm/ StudentProfileEditForm.tsx`
* `auth/components/profile/BaseProfileEditForm/ BaseProfileEditForm.tsx`
* `auth/domain/ profileValidation.ts`
* `aluno/hooks/ useStudentProfile.ts`

`aluno/components/help/WhatIsInternshipModal/ WhatIsInternshipModal.tsx`
* `organisms/Modal/ Modal.tsx`
* `atoms/Icon/ Icon.tsx`

`aluno/components/StudentNavBar/ StudentNavBar.tsx`
* `organisms/AppNavBar/ AppNavBar.tsx`
* `organisms/NotificationBell/ NotificationBell.tsx`
* `atoms/Avatar/ Avatar.tsx`
* `molecules/ProfileSummary/ ProfileSummary.tsx`
* `prazo/hooks/ useDeadlineNotifications.ts`
* `auth/store/ authStore.ts`

---

## pages/

`pages/ LoginPage.tsx`
* `templates/AuthLayout/ AuthLayout.tsx`
* `auth/components/LoginForm/ LoginForm.tsx`
* `auth/components/RecoverPasswordForm/ RecoverPasswordForm.tsx`

`pages/student/ StudentDashboardPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `aluno/components/StudentNavBar/ StudentNavBar.tsx`
* `aluno/components/progress/DeliveryProgressTracker/ DeliveryProgressTracker.tsx`
* `aluno/components/help/WhatIsInternshipModal/ WhatIsInternshipModal.tsx`
* `aluno/hooks/ useStudentProgress.ts`
* `documento/components/upload/DocumentUploadForm/ DocumentUploadForm.tsx`
* `documento/components/cards/LastDocumentCard/ LastDocumentCard.tsx`
* `modelo/components/ModelDownloadSection/ ModelDownloadSection.tsx`
* `prazo/components/DeadlineNotificationModal/ DeadlineNotificationModal.tsx`
* `prazo/components/DeadlineListModal/ DeadlineListModal.tsx`
* `prazo/hooks/ useDeadlineNotifications.ts`

`pages/student/ StudentSentDocumentsPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `aluno/components/StudentNavBar/ StudentNavBar.tsx`
* `tipo/components/TipoFilterGroup/ TipoFilterGroup.tsx`
* `documento/components/lists/LatestDocumentsSection/ LatestDocumentsSection.tsx`
* `documento/components/lists/DocumentHistorySection/ DocumentHistorySection.tsx`
* `documento/hooks/ useStudentDocuments.ts`

`pages/student/ StudentProfilePage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `aluno/components/StudentNavBar/ StudentNavBar.tsx`
* `aluno/components/profile/StudentProfileCard/ StudentProfileCard.tsx`
* `aluno/components/profile/StudentProfileView/ StudentProfileView.tsx`
* `aluno/components/profile/StudentProfileEditForm/ StudentProfileEditForm.tsx`
* `aluno/hooks/ useStudentProfile.ts`

`pages/professor/ ProfessorStudentsPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `professor/components/ProfessorNavBar/ ProfessorNavBar.tsx`
* `aluno/components/management/CSVImportSection/ CSVImportSection.tsx`
* `aluno/components/management/StudentRegistrationModal/ StudentRegistrationModal.tsx`
* `aluno/components/management/StudentFilters/ StudentFilters.tsx`
* `aluno/components/management/StudentTable/ StudentTable.tsx`
* `curso/components/CourseSelectorPanel/ CourseSelectorPanel.tsx`
* `aluno/hooks/ useStudentList.ts`
* `auth/store/ authStore.ts`

`pages/professor/ ProfessorStudentDetailPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `professor/components/ProfessorNavBar/ ProfessorNavBar.tsx`
* `aluno/components/detail/StudentProfileSection/ StudentProfileSection.tsx`
* `aluno/components/detail/ConcludeStudentButton/ ConcludeStudentButton.tsx`
* `prazo/components/DeadlineEditorList/ DeadlineEditorList.tsx`
* `documento/components/cards/DocumentCard/ DocumentCard.tsx`
* `aluno/hooks/ useStudentDetail.ts`

`pages/professor/ ProfessorDocumentsPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `professor/components/ProfessorNavBar/ ProfessorNavBar.tsx`
* `documento/components/filters/DocumentFilters/ DocumentFilters.tsx`
* `documento/components/stats/DocumentStatsDashboard/ DocumentStatsDashboard.tsx`
* `documento/components/lists/DocumentTable/ DocumentTable.tsx`
* `validacao/components/DocumentReviewModal/ DocumentReviewModal.tsx`
* `documento/hooks/ useProfessorDocuments.ts`
* `validacao/hooks/ useDocumentReview.ts`

`pages/professor/ ProfessorModelsPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `professor/components/ProfessorNavBar/ ProfessorNavBar.tsx`
* `modelo/components/ModelManagementSection/ ModelManagementSection.tsx`
* `modelo/components/ModelUploadModal/ ModelUploadModal.tsx`

`pages/professor/ ProfessorProfilePage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `professor/components/ProfessorNavBar/ ProfessorNavBar.tsx`
* `professor/components/profile/ProfessorProfileCard/ ProfessorProfileCard.tsx`
* `professor/components/profile/ProfessorProfileView/ ProfessorProfileView.tsx`
* `professor/components/profile/ProfessorProfileEditForm/ ProfessorProfileEditForm.tsx`
* `professor/hooks/ useProfessorProfile.ts`

`pages/admin/ AdminPanelPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `admin/components/AdminNavBar/ AdminNavBar.tsx`
* `admin/hooks/ useAdminAccess.ts`
* `tipo/components/TipoList/ TipoList.tsx`
* `tipo/components/TipoCreateForm/ TipoCreateForm.tsx`
* `tipo/hooks/ useTipoManagement.ts`
* `curso/components/CourseList/ CourseList.tsx`
* `curso/components/CourseCreateModal/ CourseCreateModal.tsx`
* `curso/components/ReassignProfessorModal/ ReassignProfessorModal.tsx`
* `curso/hooks/ useCourseManagement.ts`
* `admin/components/professor-management/ProfessorList/ ProfessorList.tsx`
* `admin/components/professor-management/ProfessorCreateModal/ ProfessorCreateModal.tsx`
* `admin/components/secretaria-management/SecretariaList/ SecretariaList.tsx`
* `admin/components/secretaria-management/SecretariaCreateModal/ SecretariaCreateModal.tsx`

`pages/admin/ AdminProfilePage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `admin/components/AdminNavBar/ AdminNavBar.tsx`
* `admin/hooks/ useAdminAccess.ts`
* `admin/components/profile/AdminProfileCard/ AdminProfileCard.tsx`
* `admin/components/profile/AdminProfileView/ AdminProfileView.tsx`
* `admin/components/profile/AdminProfileEditForm/ AdminProfileEditForm.tsx`
* `admin/hooks/ useAdminProfile.ts`

`pages/secretaria/ SecretariaPage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `secretaria/components/SecretariaNavBar/ SecretariaNavBar.tsx`
* `organisms/DashboardStatCard/ DashboardStatCard.tsx`
* `molecules/CheckboxGroup/ CheckboxGroup.tsx`
* `secretaria/components/ConcludedStudentTable/ ConcludedStudentTable.tsx`
* `secretaria/hooks/ useConcludedStudents.ts`

`pages/secretaria/ SecretariaProfilePage.tsx`
* `templates/PageLayout/ PageLayout.tsx`
* `secretaria/components/SecretariaNavBar/ SecretariaNavBar.tsx`
* `secretaria/components/profile/SecretariaProfileCard/ SecretariaProfileCard.tsx`
* `secretaria/components/profile/SecretariaProfileView/ SecretariaProfileView.tsx`
* `secretaria/components/profile/SecretariaProfileEditForm/ SecretariaProfileEditForm.tsx`
* `secretaria/hooks/ useSecretariaProfile.ts`

---

## app/

`app/providers/ AccessibilityProvider.tsx`
* `shared/hooks/ useAccessibility.ts`
* `shared/stores/ accessibilityStore.ts`

`app/providers/ ThemeProvider.tsx`
* `shared/hooks/ useDarkMode.ts`
* `shared/stores/ themeStore.ts`

`app/providers/ ReactQueryProvider.tsx`
* `shared/api/ queryClient.ts`

`app/providers/ AppProviders.tsx`
* `app/providers/ ReactQueryProvider.tsx`
* `app/providers/ AccessibilityProvider.tsx`
* `app/providers/ ThemeProvider.tsx`

`app/router/ routes.ts`
* `shared/constants/ routes.ts`

`app/router/ ProtectedRoute.tsx`
* `auth/hooks/ useTokenVerification.ts`
* `shared/constants/ routes.ts`

`app/router/ RoleRoute.tsx`
* `auth/store/ authStore.ts`
* `shared/constants/ routes.ts`

`app/router/ AppRouter.tsx`
* `app/router/ ProtectedRoute.tsx`
* `app/router/ RoleRoute.tsx`
* `app/router/ routes.ts`
* `pages/ LoginPage.tsx`
* `pages/student/ StudentDashboardPage.tsx`
* `pages/student/ StudentSentDocumentsPage.tsx`
* `pages/student/ StudentProfilePage.tsx`
* `pages/professor/ ProfessorStudentsPage.tsx`
* `pages/professor/ ProfessorStudentDetailPage.tsx`
* `pages/professor/ ProfessorDocumentsPage.tsx`
* `pages/professor/ ProfessorModelsPage.tsx`
* `pages/professor/ ProfessorProfilePage.tsx`
* `pages/admin/ AdminPanelPage.tsx`
* `pages/admin/ AdminProfilePage.tsx`
* `pages/secretaria/ SecretariaPage.tsx`
* `pages/secretaria/ SecretariaProfilePage.tsx`

`app/ main.tsx`
* `app/providers/ AppProviders.tsx`
* `app/router/ AppRouter.tsx`
