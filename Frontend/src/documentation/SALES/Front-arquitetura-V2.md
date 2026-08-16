# Arquitetura Frontend — Próximo Estágio V2

## O que mudou em relação à V1

| Adição                     | Impacto                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `domain/` em cada feature  | Regras de negócio saem dos hooks para funções puras testáveis                                                |
| TanStack Query             | Cache, deduplicação, invalidação e optimistic updates substituem useState + useEffect para dados de servidor |
| React Hook Form + Zod      | Todos os formulários ganham validação declarativa; schemas vivem em `domain/`                                |
| `shared/errors/`           | Hierarquia tipada de erros; apiClient lança tipos corretos; queryClient roteia para errorHandler             |
| `ControlledField` molecule | Wrapper de `Controller` (RHF) para inputs customizados (Select, Checkbox)                                    |
| `ReactQueryProvider`       | Provider que inicializa o QueryClient no topo da árvore                                                      |
| `queryKeys.ts` por feature | Keys de cache centralizadas e hierárquicas; evita colisão e facilita invalidação                             |
| `status/utils/` removida   | Movida para `status/domain/statusRules.ts`                                                                   |

---

## Estrutura de Diretórios

```
src/
├── app/
│   ├── providers/
│   │   ├── AppProviders.tsx
│   │   ├── ReactQueryProvider.tsx
│   │   ├── AccessibilityProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── router/
│   │   ├── AppRouter.tsx
│   │   ├── routes.ts
│   │   ├── ProtectedRoute.tsx
│   │   └── RoleRoute.tsx
│   └── main.tsx
│
├── design-system/
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   └── breakpoints.ts
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.types.ts
│   │   │   └── index.ts
│   │   ├── Textarea/
│   │   │   ├── Textarea.tsx
│   │   │   └── index.ts
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   └── index.ts
│   │   ├── Checkbox/
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Checkbox.types.ts
│   │   │   └── index.ts
│   │   ├── Icon/
│   │   │   ├── Icon.tsx
│   │   │   ├── Icon.types.ts
│   │   │   └── index.ts
│   │   ├── Avatar/
│   │   │   ├── Avatar.tsx
│   │   │   ├── Avatar.types.ts
│   │   │   └── index.ts
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   ├── Badge.types.ts
│   │   │   └── index.ts
│   │   ├── ProgressBar/
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ProgressBar.types.ts
│   │   │   └── index.ts
│   │   └── Skeleton/
│   │       ├── Skeleton.tsx
│   │       └── index.ts
│   ├── molecules/
│   │   ├── FormField/
│   │   │   ├── FormField.tsx
│   │   │   ├── FormField.types.ts
│   │   │   └── index.ts
│   │   ├── ControlledField/
│   │   │   ├── ControlledField.tsx
│   │   │   ├── ControlledField.types.ts
│   │   │   └── index.ts
│   │   ├── FileUploadButton/
│   │   │   ├── FileUploadButton.tsx
│   │   │   ├── FileUploadButton.types.ts
│   │   │   └── index.ts
│   │   ├── NavLink/
│   │   │   ├── NavLink.tsx
│   │   │   └── index.ts
│   │   ├── SectionHeader/
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── SectionHeader.types.ts
│   │   │   └── index.ts
│   │   ├── PaginationControls/
│   │   │   ├── PaginationControls.tsx
│   │   │   ├── PaginationControls.types.ts
│   │   │   └── index.ts
│   │   ├── ProfileSummary/
│   │   │   ├── ProfileSummary.tsx
│   │   │   └── index.ts
│   │   ├── DateField/
│   │   │   ├── DateField.tsx
│   │   │   └── index.ts
│   │   └── CheckboxGroup/
│   │       ├── CheckboxGroup.tsx
│   │       ├── CheckboxGroup.types.ts
│   │       └── index.ts
│   ├── organisms/
│   │   ├── AppNavBar/
│   │   │   ├── AppNavBar.tsx
│   │   │   ├── AppNavBar.types.ts
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   ├── Modal.types.ts
│   │   │   └── index.ts
│   │   ├── DataTable/
│   │   │   ├── DataTable.tsx
│   │   │   ├── DataTable.types.ts
│   │   │   └── index.ts
│   │   ├── FilterPanel/
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── FilterPanel.types.ts
│   │   │   └── index.ts
│   │   ├── AccessibilityMenu/
│   │   │   ├── AccessibilityMenu.tsx
│   │   │   └── index.ts
│   │   ├── NotificationBell/
│   │   │   ├── NotificationBell.tsx
│   │   │   ├── NotificationBell.types.ts
│   │   │   └── index.ts
│   │   └── DashboardStatCard/
│   │       ├── DashboardStatCard.tsx
│   │       ├── DashboardStatCard.types.ts
│   │       └── index.ts
│   ├── templates/
│   │   ├── PageLayout/
│   │   │   ├── PageLayout.tsx
│   │   │   └── index.ts
│   │   └── AuthLayout/
│   │       ├── AuthLayout.tsx
│   │       └── index.ts
│   └── index.ts
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── index.ts
│   │   │   ├── RecoverPasswordForm/
│   │   │   │   ├── RecoverPasswordForm.tsx
│   │   │   │   └── index.ts
│   │   │   └── profile/
│   │   │       ├── BaseProfileCard/
│   │   │       │   ├── BaseProfileCard.tsx
│   │   │       │   ├── BaseProfileCard.types.ts
│   │   │       │   └── index.ts
│   │   │       ├── BaseProfileView/
│   │   │       │   ├── BaseProfileView.tsx
│   │   │       │   ├── BaseProfileView.types.ts
│   │   │       │   └── index.ts
│   │   │       ├── BaseProfileEditForm/
│   │   │       │   ├── BaseProfileEditForm.tsx
│   │   │       │   ├── BaseProfileEditForm.types.ts
│   │   │       │   └── index.ts
│   │   │       └── AvatarUpload/
│   │   │           ├── AvatarUpload.tsx
│   │   │           ├── AvatarUpload.types.ts
│   │   │           └── index.ts
│   │   ├── domain/
│   │   │   ├── authRules.ts
│   │   │   ├── loginValidation.ts
│   │   │   └── profileValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useLogin.ts
│   │   │   ├── useLogout.ts
│   │   │   ├── useTokenVerification.ts
│   │   │   └── useBaseProfile.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   │
│   ├── status/
│   │   ├── components/
│   │   │   ├── StatusIcon/
│   │   │   │   ├── StatusIcon.tsx
│   │   │   │   ├── StatusIcon.types.ts
│   │   │   │   └── index.ts
│   │   │   └── StatusFilterGroup/
│   │   │       ├── StatusFilterGroup.tsx
│   │   │       ├── StatusFilterGroup.types.ts
│   │   │       └── index.ts
│   │   ├── domain/
│   │   │   └── statusRules.ts
│   │   ├── types/
│   │   │   └── status.types.ts
│   │   └── index.ts
│   │
│   ├── tipo/
│   │   ├── components/
│   │   │   ├── TipoSelect/
│   │   │   │   ├── TipoSelect.tsx
│   │   │   │   ├── TipoSelect.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── TipoFilterGroup/
│   │   │   │   ├── TipoFilterGroup.tsx
│   │   │   │   ├── TipoFilterGroup.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── TipoList/
│   │   │   │   ├── TipoList.tsx
│   │   │   │   ├── TipoList.types.ts
│   │   │   │   └── index.ts
│   │   │   └── TipoCreateForm/
│   │   │       ├── TipoCreateForm.tsx
│   │   │       ├── TipoCreateForm.types.ts
│   │   │       └── index.ts
│   │   ├── domain/
│   │   │   ├── tipoRules.ts
│   │   │   └── tipoValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useTipos.ts
│   │   │   └── useTipoManagement.ts
│   │   ├── services/
│   │   │   └── tipoService.ts
│   │   ├── types/
│   │   │   └── tipo.types.ts
│   │   └── index.ts
│   │
│   ├── feedback/
│   │   ├── components/
│   │   │   ├── FeedbackInput/
│   │   │   │   ├── FeedbackInput.tsx
│   │   │   │   ├── FeedbackInput.types.ts
│   │   │   │   └── index.ts
│   │   │   └── FeedbackDisplay/
│   │   │       ├── FeedbackDisplay.tsx
│   │   │       ├── FeedbackDisplay.types.ts
│   │   │       └── index.ts
│   │   ├── domain/
│   │   │   └── feedbackValidation.ts
│   │   ├── types/
│   │   │   └── feedback.types.ts
│   │   └── index.ts
│   │
│   ├── validacao/
│   │   ├── components/
│   │   │   ├── DocumentReviewModal/
│   │   │   │   ├── DocumentReviewModal.tsx
│   │   │   │   ├── DocumentReviewModal.types.ts
│   │   │   │   └── index.ts
│   │   │   └── ValidacaoActions/
│   │   │       ├── ValidacaoActions.tsx
│   │   │       ├── ValidacaoActions.types.ts
│   │   │       └── index.ts
│   │   ├── domain/
│   │   │   ├── validacaoRules.ts
│   │   │   └── validacaoValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   └── useDocumentReview.ts
│   │   ├── services/
│   │   │   └── validacaoService.ts
│   │   ├── types/
│   │   │   └── validacao.types.ts
│   │   └── index.ts
│   │
│   ├── prazo/
│   │   ├── components/
│   │   │   ├── DeadlineEditorRow/
│   │   │   │   ├── DeadlineEditorRow.tsx
│   │   │   │   ├── DeadlineEditorRow.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── DeadlineEditorList/
│   │   │   │   ├── DeadlineEditorList.tsx
│   │   │   │   ├── DeadlineEditorList.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── DeadlineNotificationModal/
│   │   │   │   ├── DeadlineNotificationModal.tsx
│   │   │   │   ├── DeadlineNotificationModal.types.ts
│   │   │   │   └── index.ts
│   │   │   └── DeadlineListModal/
│   │   │       ├── DeadlineListModal.tsx
│   │   │       ├── DeadlineListModal.types.ts
│   │   │       └── index.ts
│   │   ├── domain/
│   │   │   ├── prazoRules.ts
│   │   │   └── prazoValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useDeadlineManagement.ts
│   │   │   └── useDeadlineNotifications.ts
│   │   ├── services/
│   │   │   └── prazoService.ts
│   │   ├── types/
│   │   │   └── prazo.types.ts
│   │   └── index.ts
│   │
│   ├── modelo/
│   │   ├── components/
│   │   │   ├── ModelCard/
│   │   │   │   ├── ModelCard.tsx
│   │   │   │   ├── ModelCard.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── ModelDownloadSection/
│   │   │   │   ├── ModelDownloadSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ModelManagementSection/
│   │   │   │   ├── ModelManagementSection.tsx
│   │   │   │   └── index.ts
│   │   │   └── ModelUploadModal/
│   │   │       ├── ModelUploadModal.tsx
│   │   │       ├── ModelUploadModal.types.ts
│   │   │       └── index.ts
│   │   ├── domain/
│   │   │   ├── modeloRules.ts
│   │   │   └── modeloValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useModels.ts
│   │   │   ├── useModelUpload.ts
│   │   │   └── useModelDownload.ts
│   │   ├── services/
│   │   │   └── modeloService.ts
│   │   ├── types/
│   │   │   └── modelo.types.ts
│   │   └── index.ts
│   │
│   ├── documento/
│   │   ├── components/
│   │   │   ├── upload/
│   │   │   │   ├── DocumentUploadForm/
│   │   │   │   │   ├── DocumentUploadForm.tsx
│   │   │   │   │   ├── DocumentUploadForm.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── DocumentNameInput/
│   │   │   │       ├── DocumentNameInput.tsx
│   │   │   │       └── index.ts
│   │   │   ├── cards/
│   │   │   │   ├── DocumentCard/
│   │   │   │   │   ├── DocumentCard.tsx
│   │   │   │   │   ├── DocumentCard.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── LastDocumentCard/
│   │   │   │       ├── LastDocumentCard.tsx
│   │   │   │       ├── LastDocumentCard.types.ts
│   │   │   │       └── index.ts
│   │   │   ├── lists/
│   │   │   │   ├── SentDocumentsList/
│   │   │   │   │   ├── SentDocumentsList.tsx
│   │   │   │   │   ├── SentDocumentsList.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── LatestDocumentsSection/
│   │   │   │   │   ├── LatestDocumentsSection.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── DocumentHistorySection/
│   │   │   │   │   ├── DocumentHistorySection.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── DocumentTable/
│   │   │   │       ├── DocumentTable.tsx
│   │   │   │       ├── DocumentTable.types.ts
│   │   │   │       └── index.ts
│   │   │   ├── filters/
│   │   │   │   └── DocumentFilters/
│   │   │   │       ├── DocumentFilters.tsx
│   │   │   │       ├── DocumentFilters.types.ts
│   │   │   │       └── index.ts
│   │   │   └── stats/
│   │   │       └── DocumentStatsDashboard/
│   │   │           ├── DocumentStatsDashboard.tsx
│   │   │           ├── DocumentStatsDashboard.types.ts
│   │   │           └── index.ts
│   │   ├── domain/
│   │   │   ├── documentoRules.ts
│   │   │   └── documentoValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useDocumentUpload.ts
│   │   │   ├── useStudentDocuments.ts
│   │   │   └── useProfessorDocuments.ts
│   │   ├── services/
│   │   │   └── documentoService.ts
│   │   ├── types/
│   │   │   └── documento.types.ts
│   │   └── index.ts
│   │
│   ├── aluno/
│   │   ├── components/
│   │   │   ├── StudentNavBar/
│   │   │   │   ├── StudentNavBar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── progress/
│   │   │   │   └── DeliveryProgressTracker/
│   │   │   │       ├── DeliveryProgressTracker.tsx
│   │   │   │       ├── DeliveryProgressTracker.types.ts
│   │   │   │       └── index.ts
│   │   │   ├── management/
│   │   │   │   ├── StudentTable/
│   │   │   │   │   ├── StudentTable.tsx
│   │   │   │   │   ├── StudentTable.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── StudentFilters/
│   │   │   │   │   ├── StudentFilters.tsx
│   │   │   │   │   ├── StudentFilters.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── StudentRegistrationModal/
│   │   │   │   │   ├── StudentRegistrationModal.tsx
│   │   │   │   │   ├── StudentRegistrationModal.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── CSVImportSection/
│   │   │   │       ├── CSVImportSection.tsx
│   │   │   │       ├── CSVImportButton/
│   │   │   │       │   ├── CSVImportButton.tsx
│   │   │   │       │   └── index.ts
│   │   │   │       ├── CSVPreviewTable/
│   │   │   │       │   ├── CSVPreviewTable.tsx
│   │   │   │       │   ├── CSVPreviewTable.types.ts
│   │   │   │       │   └── index.ts
│   │   │   │       └── index.ts
│   │   │   ├── detail/
│   │   │   │   ├── StudentProfileSection/
│   │   │   │   │   ├── StudentProfileSection.tsx
│   │   │   │   │   ├── StudentProfileSection.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── ConcludeStudentButton/
│   │   │   │       ├── ConcludeStudentButton.tsx
│   │   │   │       ├── ConcludeStudentButton.types.ts
│   │   │   │       └── index.ts
│   │   │   ├── profile/
│   │   │   │   ├── StudentProfileCard/
│   │   │   │   │   ├── StudentProfileCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── StudentProfileView/
│   │   │   │   │   ├── StudentProfileView.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── StudentProfileEditForm/
│   │   │   │       ├── StudentProfileEditForm.tsx
│   │   │   │       └── index.ts
│   │   │   └── help/
│   │   │       └── WhatIsInternshipModal/
│   │   │           ├── WhatIsInternshipModal.tsx
│   │   │           └── index.ts
│   │   ├── domain/
│   │   │   ├── alunoRules.ts
│   │   │   ├── alunoValidation.ts
│   │   │   └── csvRules.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useStudentList.ts
│   │   │   ├── useCSVImport.ts
│   │   │   ├── useStudentRegistration.ts
│   │   │   ├── useStudentDetail.ts
│   │   │   ├── useConcludeStudent.ts
│   │   │   ├── useStudentProgress.ts
│   │   │   └── useStudentProfile.ts
│   │   ├── services/
│   │   │   └── alunoService.ts
│   │   ├── types/
│   │   │   └── aluno.types.ts
│   │   └── index.ts
│   │
│   ├── professor/
│   │   ├── components/
│   │   │   ├── ProfessorNavBar/
│   │   │   │   ├── ProfessorNavBar.tsx
│   │   │   │   └── index.ts
│   │   │   └── profile/
│   │   │       ├── ProfessorProfileCard/
│   │   │       │   ├── ProfessorProfileCard.tsx
│   │   │       │   └── index.ts
│   │   │       ├── ProfessorProfileView/
│   │   │       │   ├── ProfessorProfileView.tsx
│   │   │       │   └── index.ts
│   │   │       └── ProfessorProfileEditForm/
│   │   │           ├── ProfessorProfileEditForm.tsx
│   │   │           └── index.ts
│   │   ├── domain/
│   │   │   └── professorRules.ts
│   │   ├── hooks/
│   │   │   └── useProfessorProfile.ts
│   │   ├── services/
│   │   │   └── professorService.ts
│   │   ├── types/
│   │   │   └── professor.types.ts
│   │   └── index.ts
│   │
│   ├── curso/
│   │   ├── components/
│   │   │   ├── CourseSelect/
│   │   │   │   ├── CourseSelect.tsx
│   │   │   │   ├── CourseSelect.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── CourseSelectorPanel/
│   │   │   │   ├── CourseSelectorPanel.tsx
│   │   │   │   └── index.ts
│   │   │   ├── CourseList/
│   │   │   │   ├── CourseList.tsx
│   │   │   │   ├── CourseList.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── CourseCreateModal/
│   │   │   │   ├── CourseCreateModal.tsx
│   │   │   │   ├── CourseCreateModal.types.ts
│   │   │   │   └── index.ts
│   │   │   └── ReassignProfessorModal/
│   │   │       ├── ReassignProfessorModal.tsx
│   │   │       ├── ReassignProfessorModal.types.ts
│   │   │       └── index.ts
│   │   ├── domain/
│   │   │   ├── cursoRules.ts
│   │   │   └── cursoValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useCursos.ts
│   │   │   └── useCourseManagement.ts
│   │   ├── services/
│   │   │   └── cursoService.ts
│   │   ├── types/
│   │   │   └── curso.types.ts
│   │   └── index.ts
│   │
│   ├── admin/
│   │   ├── components/
│   │   │   ├── AdminNavBar/
│   │   │   │   ├── AdminNavBar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── professor-management/
│   │   │   │   ├── ProfessorList/
│   │   │   │   │   ├── ProfessorList.tsx
│   │   │   │   │   ├── ProfessorList.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── ProfessorCreateModal/
│   │   │   │       ├── ProfessorCreateModal.tsx
│   │   │   │       ├── ProfessorCreateModal.types.ts
│   │   │   │       └── index.ts
│   │   │   ├── secretaria-management/
│   │   │   │   ├── SecretariaList/
│   │   │   │   │   ├── SecretariaList.tsx
│   │   │   │   │   ├── SecretariaList.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── SecretariaCreateModal/
│   │   │   │       ├── SecretariaCreateModal.tsx
│   │   │   │       ├── SecretariaCreateModal.types.ts
│   │   │   │       └── index.ts
│   │   │   └── profile/
│   │   │       ├── AdminProfileCard/
│   │   │       │   ├── AdminProfileCard.tsx
│   │   │       │   └── index.ts
│   │   │       ├── AdminProfileView/
│   │   │       │   ├── AdminProfileView.tsx
│   │   │       │   └── index.ts
│   │   │       └── AdminProfileEditForm/
│   │   │           ├── AdminProfileEditForm.tsx
│   │   │           └── index.ts
│   │   ├── domain/
│   │   │   ├── adminRules.ts
│   │   │   ├── professorValidation.ts
│   │   │   └── secretariaValidation.ts
│   │   ├── hooks/
│   │   │   ├── queryKeys.ts
│   │   │   ├── useAdminAccess.ts
│   │   │   ├── useProfessorManagement.ts
│   │   │   ├── useSecretariaManagement.ts
│   │   │   └── useAdminProfile.ts
│   │   ├── services/
│   │   │   └── adminService.ts
│   │   ├── types/
│   │   │   └── admin.types.ts
│   │   └── index.ts
│   │
│   └── secretaria/
│       ├── components/
│       │   ├── SecretariaNavBar/
│       │   │   ├── SecretariaNavBar.tsx
│       │   │   └── index.ts
│       │   ├── ConcludedStudentTable/
│       │   │   ├── ConcludedStudentTable.tsx
│       │   │   ├── ConcludedStudentTable.types.ts
│       │   │   └── index.ts
│       │   ├── StudentDocumentsExpander/
│       │   │   ├── StudentDocumentsExpander.tsx
│       │   │   ├── StudentDocumentsExpander.types.ts
│       │   │   └── index.ts
│       │   └── profile/
│       │       ├── SecretariaProfileCard/
│       │       │   ├── SecretariaProfileCard.tsx
│       │       │   └── index.ts
│       │       ├── SecretariaProfileView/
│       │       │   ├── SecretariaProfileView.tsx
│       │       │   └── index.ts
│       │       └── SecretariaProfileEditForm/
│       │           ├── SecretariaProfileEditForm.tsx
│       │           └── index.ts
│       ├── domain/
│       │   └── secretariaRules.ts
│       ├── hooks/
│       │   ├── queryKeys.ts
│       │   ├── useConcludedStudents.ts
│       │   └── useSecretariaProfile.ts
│       ├── services/
│       │   └── secretariaService.ts
│       ├── types/
│       │   └── secretaria.types.ts
│       └── index.ts
│
├── shared/
│   ├── api/
│   │   ├── apiClient.ts
│   │   ├── apiConfig.ts
│   │   ├── endpoints.ts
│   │   └── queryClient.ts
│   ├── errors/
│   │   ├── AppError.ts
│   │   ├── ApiError.ts
│   │   ├── ValidationError.ts
│   │   ├── UnauthorizedError.ts
│   │   ├── NotFoundError.ts
│   │   ├── NetworkError.ts
│   │   ├── BusinessRuleError.ts
│   │   ├── errorHandler.ts
│   │   ├── ErrorBoundary.tsx
│   │   └── useErrorHandler.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── usePagination.ts
│   │   ├── usePopup.ts
│   │   ├── useAccessibility.ts
│   │   └── useDarkMode.ts
│   ├── stores/
│   │   ├── accessibilityStore.ts
│   │   └── themeStore.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── csvParser.ts
│   ├── types/
│   │   ├── common.types.ts
│   │   └── api.types.ts
│   └── constants/
│       ├── routes.ts
│       └── documentDefaults.ts
│
└── pages/
    ├── LoginPage.tsx
    ├── student/
    │   ├── StudentDashboardPage.tsx
    │   ├── StudentSentDocumentsPage.tsx
    │   └── StudentProfilePage.tsx
    ├── professor/
    │   ├── ProfessorStudentsPage.tsx
    │   ├── ProfessorStudentDetailPage.tsx
    │   ├── ProfessorDocumentsPage.tsx
    │   ├── ProfessorModelsPage.tsx
    │   └── ProfessorProfilePage.tsx
    ├── admin/
    │   ├── AdminPanelPage.tsx
    │   └── AdminProfilePage.tsx
    └── secretaria/
        ├── SecretariaPage.tsx
        └── SecretariaProfilePage.tsx
```

---

## Descrição dos Arquivos

### app/

`app/providers/AppProviders.tsx` — Compõe todos os providers na ordem correta: ReactQueryProvider, ThemeProvider, AccessibilityProvider; ponto único de configuração global da árvore de contextos

`app/providers/ReactQueryProvider.tsx` — Inicializa o QueryClient importado de shared/api/queryClient.ts e envolve a árvore em QueryClientProvider; é aqui que o DevTools do TanStack Query é montado em desenvolvimento

`app/providers/AccessibilityProvider.tsx` — Observa o accessibilityStore e aplica o atributo `acessibilidade` no document.documentElement; sem lógica de UI

`app/providers/ThemeProvider.tsx` — Observa o themeStore e aplica o atributo `tema` no document.documentElement; sem lógica de UI

`app/router/AppRouter.tsx` — Declara todas as Routes da aplicação, compondo ProtectedRoute e RoleRoute onde necessário

`app/router/routes.ts` — Objeto com todos os caminhos de rota como constantes tipadas; elimina strings de caminho soltas no código

`app/router/ProtectedRoute.tsx` — Monta useTokenVerification; redireciona para login se token ausente ou inválido antes de renderizar filhos

`app/router/RoleRoute.tsx` — Verifica nivel === 'admin' no authStore; redireciona para rota padrão se o nível de acesso for insuficiente

`app/main.tsx` — Ponto de entrada; monta AppProviders e AppRouter no DOM

---

### design-system/tokens/

`tokens/colors.ts` — Todas as variáveis CSS como constantes TypeScript consumidas pelo tailwind.config.ts via extend.colors

`tokens/typography.ts` — Definições de FontePadrao e tamanhos de fonte fs14, fs16, fs18, fs28, fs36

`tokens/spacing.ts` — Valores dos utilitários de gap e padding: g4, g8, g16, g32, p8, p16, p32

`tokens/shadows.ts` — Box-shadow padrão dos containers

`tokens/breakpoints.ts` — Breakpoints responsivos: 480px, 767px, 1024px, 1280px, 1440px

---

### design-system/atoms/

`atoms/Button/Button.tsx` — Botão base com variantes: primary (vermelho), secondary (cinza), link (borda), validate (verde), invalidate (vermelho borda), file (dashed), fit (width fit-content); aceita prop isLoading para estado de submissão

`atoms/Button/Button.types.ts` — Props: variant, onClick, disabled, isLoading, children

`atoms/Input/Input.tsx` — Input controlado; aceita spread de register do React Hook Form nativamente via props HTML padrão; suporte a estado de erro visual

`atoms/Input/Input.types.ts` — Props: type, placeholder, value, onChange, error, disabled

`atoms/Textarea/Textarea.tsx` — Textarea com min-height e resize controlado; aceita spread de register do RHF

`atoms/Select/Select.tsx` — Select nativo estilizado; para uso com RHF usa ControlledField molecule; recebe options[] e value/onChange

`atoms/Checkbox/Checkbox.tsx` — Checkbox customizado com .custom-box e .inner-box; para uso com RHF usa ControlledField molecule; suporte a colorVariant

`atoms/Checkbox/Checkbox.types.ts` — Props: checked, onChange, label, colorVariant: 'red' | 'blue'

`atoms/Icon/Icon.tsx` — Mapeia IconName para o SVG importado correspondente; substitui as classes .icon e .icon-nav do sistema original

`atoms/Icon/Icon.types.ts` — IconName: union type de todos os ícones existentes no sistema

`atoms/Avatar/Avatar.tsx` — Imagem circular com fallback para ft-perfil.png

`atoms/Avatar/Avatar.types.ts` — Props: src?, size: 'sm' | 'md' | 'lg', alt

`atoms/Badge/Badge.tsx` — Círculo de notificação vermelho com contagem; visível apenas quando count > 0

`atoms/Badge/Badge.types.ts` — Props: count, visible

`atoms/ProgressBar/ProgressBar.tsx` — Barra de progresso com width% controlada e variante de cor

`atoms/ProgressBar/ProgressBar.types.ts` — Props: percentage, colorVariant

`atoms/Skeleton/Skeleton.tsx` — Linha de loading animada; substitui td.loading das tabelas durante carregamento

---

### design-system/molecules/

`molecules/FormField/FormField.tsx` — Compõe label + Input (ou Textarea, Select) + mensagem de erro; para inputs nativos que aceitam register spread; não usa Controller

`molecules/FormField/FormField.types.ts` — Props: label, error?, children

`molecules/ControlledField/ControlledField.tsx` — Wrapper de Controller do React Hook Form para inputs customizados (Select, Checkbox, FileUploadButton) que não aceitam register spread; integra label, o campo via render prop e exibição de erro; elimina boilerplate de Controller repetido em todo formulário

`molecules/ControlledField/ControlledField.types.ts` — Props: name, control, label?, error?, render: (field) => ReactNode

`molecules/FileUploadButton/FileUploadButton.tsx` — Botão dashed (btn-F) + input file hidden + exibição do nome do arquivo selecionado; para uso em formulários RHF via ControlledField

`molecules/FileUploadButton/FileUploadButton.types.ts` — Props: accept, onFileSelect, fileName, label

`molecules/NavLink/NavLink.tsx` — Wrapper de link de navegação para a navbar com Icon e comportamento de hover

`molecules/SectionHeader/SectionHeader.tsx` — Cabeçalho de seção com variante topV (vermelho) e topC (cinza); slots para ícone, título e ação direita

`molecules/SectionHeader/SectionHeader.types.ts` — Props: variant: 'red' | 'gray', title, icon?, actionSlot?

`molecules/PaginationControls/PaginationControls.tsx` — Botões numerados de paginação client-side; usado junto com usePagination para dados já carregados em memória

`molecules/PaginationControls/PaginationControls.types.ts` — Props: currentPage, totalPages, onPageChange

`molecules/ProfileSummary/ProfileSummary.tsx` — Nome e email do usuário exibidos na direita da navbar

`molecules/DateField/DateField.tsx` — Input type="date" com label e slot de ação; aceita register spread do RHF

`molecules/CheckboxGroup/CheckboxGroup.tsx` — Lista genérica de Checkbox atoms com título de grupo

`molecules/CheckboxGroup/CheckboxGroup.types.ts` — Props: title, options[], selectedValues, onChange

---

### design-system/organisms/

`organisms/AppNavBar/AppNavBar.tsx` — Navbar base completa: logo, links[], AccessibilityMenu, dark mode toggle, rightSlot; base usada por todas as navbars de feature

`organisms/AppNavBar/AppNavBar.types.ts` — Props: links: NavLinkConfig[], rightSlot: ReactNode, onDarkModeToggle

`organisms/Modal/Modal.tsx` — Overlay com blur, container animado com transform scale, tamanhos default e slim; substitui o padrão de popup-layer com innerHTML do projeto original

`organisms/Modal/Modal.types.ts` — Props: isOpen, onClose, size: 'default' | 'slim', children

`organisms/DataTable/DataTable.tsx` — Tabela genérica com columns[], data[], estado isLoading (Skeleton), emptyMessage e onRowClick; paginação client-side via PaginationControls quando necessário

`organisms/DataTable/DataTable.types.ts` — ColumnDef: key, header, render?: (row) => ReactNode

`organisms/FilterPanel/FilterPanel.tsx` — Container cinza com slot para grupos de filtros; compositivo, sem lógica própria

`organisms/FilterPanel/FilterPanel.types.ts` — Props: children, title?

`organisms/AccessibilityMenu/AccessibilityMenu.tsx` — Dropdown com os 5 modos: normal, deuteranopia, protanopia, tritanopia, alto-contraste; lê e escreve no accessibilityStore via useAccessibility

`organisms/NotificationBell/NotificationBell.tsx` — Ícone de sino com Badge de contagem e handler de clique

`organisms/NotificationBell/NotificationBell.types.ts` — Props: count, onClick

`organisms/DashboardStatCard/DashboardStatCard.tsx` — Card de estatística: StatusIcon + label + ProgressBar + contador; usado no painel de documentos

`organisms/DashboardStatCard/DashboardStatCard.types.ts` — Props: status: DocumentStatus, count, percentage

---

### design-system/templates/

`templates/PageLayout/PageLayout.tsx` — Shell de página: slot para navbar + main.content + ponto de montagem de modais via ErrorBoundary

`templates/AuthLayout/AuthLayout.tsx` — Layout centralizado verticalmente com fundo cinza escuro; usado nas páginas de login e recuperação de senha

`design-system/index.ts` — Barrel export de todos os componentes do design system

---

### shared/api/

`shared/api/apiConfig.ts` — Determina BASE_URL e API_URL conforme hostname; exporta getApiUrl() e getBaseUrl(); substitui config.js do projeto original

`shared/api/endpoints.ts` — Constantes de todos os endpoints da API: ENDPOINTS.LOGIN, ENDPOINTS.DOCUMENTO, etc.; elimina strings de rota soltas nos services

`shared/api/apiClient.ts` — Instância configurada do Axios com dois interceptors: request interceptor injeta o header Authorization com token do localStorage e define Content-Type; response interceptor mapeia erros HTTP para as classes tipadas de shared/errors (UnauthorizedError para 401, NotFoundError para 404, ApiError para outros 4xx/5xx, NetworkError para falha de rede ou timeout); exporta get, post, upload e download como funções tipadas que os services consomem

`shared/api/queryClient.ts` — Instância configurada do QueryClient do TanStack Query: staleTime padrão de 5 minutos, retry: 1 para queries, retry: 0 para mutations; defaultOptions.onError roteia erros para errorHandler de shared/errors; exportado e importado por ReactQueryProvider

---

### shared/errors/

`shared/errors/AppError.ts` — Classe base de todos os erros do sistema: propriedades code (string), message, context (objeto livre), timestamp; estende Error nativo

`shared/errors/ApiError.ts` — Erro de resposta HTTP; estende AppError; adiciona statusCode e endpoint; base para erros HTTP específicos

`shared/errors/ValidationError.ts` — Erro de validação de formulário ou de regra de domínio; estende AppError; adiciona fieldErrors: Record<string, string> para mapeamento campo → mensagem

`shared/errors/UnauthorizedError.ts` — Erro de autenticação (HTTP 401); estende ApiError com statusCode fixo 401; ao ser capturado pelo queryClient, limpa authStore e redireciona para login

`shared/errors/NotFoundError.ts` — Erro de recurso não encontrado (HTTP 404); estende ApiError com statusCode fixo 404

`shared/errors/NetworkError.ts` — Falha de rede sem resposta HTTP (timeout, offline, CORS); estende AppError; sem statusCode

`shared/errors/BusinessRuleError.ts` — Violação de regra de negócio detectada no domínio ou no backend sem ser erro de validação de campo; estende AppError; ex: "Prazo já vencido, não é possível enviar"

`shared/errors/errorHandler.ts` — Função central handleError(error: AppError): void; mapeia tipo de erro para mensagem amigável em português; integra com sistema de toast/notificação; loga em console (dev) ou serviço de monitoramento (prod); chamado pelo queryClient em defaultOptions.onError e por useErrorHandler

`shared/errors/ErrorBoundary.tsx` — React class component que captura erros de renderização na árvore de componentes; exibe UI de fallback genérica; previne tela em branco em erros inesperados

`shared/errors/useErrorHandler.ts` — Hook que expõe handleError para uso imperativo dentro de mutations e side effects; integra com errorHandler.ts; permite que cada mutação trate erros específicos antes de repassar ao handler global

---

### shared/hooks/

`shared/hooks/useLocalStorage.ts` — Hook tipado para leitura e escrita sincronizada no localStorage; usado apenas para dados de UI (tema, acessibilidade), não para dados de servidor

`shared/hooks/usePagination.ts` — Paginação client-side para dados já em memória (ex: filtros aplicados localmente na tabela de alunos); retorna currentPage, totalPages, paginatedData, goToPage

`shared/hooks/usePopup.ts` — Estado simples de modal: isOpen, open(), close(), toggle(); para modais cujo estado é UI local e não precisa do TanStack Query

`shared/hooks/useAccessibility.ts` — Lê e escreve no accessibilityStore; aplica atributo acessibilidade no document.documentElement

`shared/hooks/useDarkMode.ts` — Lê e escreve no themeStore; aplica atributo tema no document.documentElement

---

### shared/stores/

`shared/stores/accessibilityStore.ts` — Zustand com persist via localStorage: modoAcessibilidade: AccessibilityMode (normal | deuteranopia | protanopia | tritanopia | alto-contraste)

`shared/stores/themeStore.ts` — Zustand com persist via localStorage: tema: 'light' | 'dark'

---

### shared/utils/

`shared/utils/formatters.ts` — formatDate(iso): string em pt-BR; formatRA(ra): string; formatSemestre(n): string com sufixo "º Semestre"; funções puras sem dependências

`shared/utils/validators.ts` — isValidRA(ra): boolean via /^\d{13}$/; isValidEmail(email): boolean; funções puras de validação de campo usadas por domain/ das features

`shared/utils/csvParser.ts` — parseCSV(text): RawCSVRow[]; detecta separador ; ou ,; mapeia variantes de cabeçalho (ra, r.a., registro acadêmico, etc.); retorna dados brutos sem validação de negócio — a validação de negócio fica em aluno/domain/csvRules.ts

---

### shared/types/

`shared/types/common.types.ts` — DocumentStatus, UserRole, AccessibilityMode, DocumentTypeName ('A' | 'B' | 'C', extensível)

`shared/types/api.types.ts` — ApiResponse, PaginatedResponse; usados nos retornos dos services

---

### shared/constants/

`shared/constants/routes.ts` — ROUTES.LOGIN, ROUTES.STUDENT.DASHBOARD, ROUTES.PROFESSOR.STUDENTS, etc.; importado por AppRouter, RoleRoute e qualquer redirect

`shared/constants/documentDefaults.ts` — DEFAULT_MODEL_DESCRIPTIONS: Record<string, string> com descrições padrão dos modelos A, B e C; elimina a constante triplicada no projeto original

---

### features/auth/

`auth/domain/authRules.ts` — Funções puras de regra de acesso: canAccess(role, route): boolean, hasRole(user, role): boolean; sem efeitos colaterais; importado por RoleRoute e hooks que precisam checar permissão

`auth/domain/loginValidation.ts` — Schema Zod para o formulário de login: email válido obrigatório, senha mínimo de 6 caracteres; importado por LoginForm via zodResolver

`auth/domain/profileValidation.ts` — Schema Zod para edição de perfil: nome obrigatório, email válido, telefone opcional, nova senha mínimo 6 (condicional), confirmação deve ser igual à nova senha; importado pelos ProfileEditForms via zodResolver

`auth/hooks/queryKeys.ts` — Hierarquia de chaves de cache: authQueryKeys.profile(userId), authQueryKeys.all; usada por useBaseProfile para identificar e invalidar o cache do perfil

`auth/hooks/useLogin.ts` — useMutation que chama authService.login; em onSuccess popula authStore e redireciona por tipoUsuario; em onError lança para useErrorHandler

`auth/hooks/useLogout.ts` — useMutation que chama authService.logout; em onSuccess limpa authStore, invalida todos os queries e redireciona para login

`auth/hooks/useTokenVerification.ts` — useQuery com enabled: !!token e retry: false; verifica token ao montar ProtectedRoute; em onError limpa authStore e redireciona para login

`auth/hooks/useBaseProfile.ts` — useQuery para carregar perfil (queryKey: authQueryKeys.profile); useMutation para update (invalida query do perfil em onSuccess); useMutation separado para upload de foto; base genérica chamada por useStudentProfile, useProfessorProfile, etc.

`auth/services/authService.ts` — POST /login, POST /logout, POST /verificar-token, GET /perfil, PATCH /perfil, POST /upload-foto; lança erros tipados de shared/errors

`auth/store/authStore.ts` — Zustand com persist via localStorage: token, tipoUsuario, nome, email, idprofessor, idaluno, idsecretaria, nivel, foto; único ponto de verdade para identidade do usuário logado

`auth/types/auth.types.ts` — LoginPayload, LoginResponse, ProfileField (label + key + type), UserRole

`auth/components/LoginForm/LoginForm.tsx` — Formulário com email, senha e botão Logar; usa useForm com zodResolver(loginValidation); campos Input com register spread; submete via useLogin mutation; suporte a Enter

`auth/components/RecoverPasswordForm/RecoverPasswordForm.tsx` — Formulário de recuperação por email; usa useForm com zodResolver; submete para authService diretamente via useMutation

`auth/components/profile/BaseProfileCard/BaseProfileCard.tsx` — Container topC com três slots: leftSlot (avatar), centerSlot (info contextual por role), rightSlot (ação); sem lógica própria

`auth/components/profile/BaseProfileCard/BaseProfileCard.types.ts` — Props: leftSlot, centerSlot, rightSlot: ReactNode

`auth/components/profile/BaseProfileView/BaseProfileView.tsx` — Modo estático: renderiza lista de campos via fields[], botão Editar perfil; sem form

`auth/components/profile/BaseProfileView/BaseProfileView.types.ts` — Props: fields: ProfileField[], onEdit

`auth/components/profile/BaseProfileEditForm/BaseProfileEditForm.tsx` — Modo editável com React Hook Form via FormProvider; usa useFormContext() para acessar o form criado pelo ProfileEditForm pai; renderiza campos via fields[], inputs de nova senha e confirmar, botão Salvar; não cria o useForm — recebe o contexto

`auth/components/profile/BaseProfileEditForm/BaseProfileEditForm.types.ts` — Props: fields: ProfileField[], onSave, onCancel

`auth/components/profile/AvatarUpload/AvatarUpload.tsx` — Avatar circular clicável com input file hidden; exibe foto atual ou fallback; aceita .jpg, .jpeg, .png; chama onFileSelect sem fazer upload diretamente

`auth/components/profile/AvatarUpload/AvatarUpload.types.ts` — Props: src?, onFileSelect: (file: File) => void

---

### features/status/

`status/domain/statusRules.ts` — Funções puras: getStatusIcon(status): IconName, getStatusColor(status): string, isDocumentFinal(status): boolean (validado ou invalidado); constante STATUS_LABELS; substitui e centraliza getIconClass duplicada em 5 arquivos do projeto original

`status/types/status.types.ts` — DocumentStatus: 'Validado' | 'Invalidado' | 'Visualizado' | 'Não Avaliado'

`status/components/StatusIcon/StatusIcon.tsx` — Ícone de status que usa statusRules.getStatusIcon e statusRules.getStatusColor para aplicar estilos; variantes: check (verde), off (vermelho), eye (azul), clock (amarelo), empty (dashed)

`status/components/StatusIcon/StatusIcon.types.ts` — Props: status: DocumentStatus

`status/components/StatusFilterGroup/StatusFilterGroup.tsx` — Quatro Checkbox atoms para filtrar por status: Validado, Invalidado, Visualizado, Não Avaliado

`status/components/StatusFilterGroup/StatusFilterGroup.types.ts` — Props: selectedStatuses, onChange

---

### features/tipo/

`tipo/domain/tipoRules.ts` — Funções puras: isTipoAtivo(tipo): boolean, getTiposAtivos(tipos[]): TipoDocumento[]; sem efeitos colaterais

`tipo/domain/tipoValidation.ts` — Schema Zod para criação de tipo: nome obrigatório, não vazio, máximo 10 caracteres; importado por TipoCreateForm via zodResolver

`tipo/hooks/queryKeys.ts` — tipoQueryKeys.all, tipoQueryKeys.list(); chave base para cache de tipos

`tipo/hooks/useTipos.ts` — useQuery que chama tipoService.getAtivos(); dados usados por TipoSelect e TipoFilterGroup; deduplicado pelo TanStack Query — chamadas em paralelo retornam o mesmo cache

`tipo/hooks/useTipoManagement.ts` — useQuery para lista completa (ativos e inativos) + useMutation para criar + useMutation para toggle ativo; mutations invalidam tipoQueryKeys.all em onSuccess

`tipo/services/tipoService.ts` — GET /tipo, POST /tipo, PATCH /tipo/:id

`tipo/types/tipo.types.ts` — TipoDocumento: { idtipo, nome, ordem, ativo, descricao }

`tipo/components/TipoSelect/TipoSelect.tsx` — Select populado com dados de useTipos; usado no DocumentUploadForm pelo aluno

`tipo/components/TipoSelect/TipoSelect.types.ts` — Props: value, onChange; carrega tipos internamente

`tipo/components/TipoFilterGroup/TipoFilterGroup.tsx` — Checkboxes dinâmicos por tipo (A, B, C e futuros) via useTipos; usado nos filtros de documento

`tipo/components/TipoFilterGroup/TipoFilterGroup.types.ts` — Props: selectedTipos, onChange

`tipo/components/TipoList/TipoList.tsx` — Lista admin de tipos via useTipoManagement: nome + ordem + StatusIcon ativo/inativo + botão toggle por item

`tipo/components/TipoList/TipoList.types.ts` — Props: sem props; dados carregados internamente via useTipoManagement

`tipo/components/TipoCreateForm/TipoCreateForm.tsx` — Formulário com useForm + zodResolver(tipoValidation); Input nome + botão Adicionar Tipo; submete via useTipoManagement.createMutation

`tipo/components/TipoCreateForm/TipoCreateForm.types.ts` — Props: onSuccess callback

---

### features/feedback/

`feedback/domain/feedbackValidation.ts` — Schema Zod para o campo de feedback: string opcional, máximo 1000 caracteres; importado por DocumentReviewModal via zodResolver

`feedback/types/feedback.types.ts` — Feedback: { idfeedback, texto, validacao_id }

`feedback/components/FeedbackInput/FeedbackInput.tsx` — Textarea com label "Adicione um feedback para o aluno"; recebe register spread do RHF; usado dentro do DocumentReviewModal

`feedback/components/FeedbackInput/FeedbackInput.types.ts` — Props: error?; demais props via register spread

`feedback/components/FeedbackDisplay/FeedbackDisplay.tsx` — Container cinza com texto do feedback e StatusIcon do status atual; exibido dentro do DocumentCard quando feedback existe

`feedback/components/FeedbackDisplay/FeedbackDisplay.types.ts` — Props: text: string, status: DocumentStatus

---

### features/validacao/

`validacao/domain/validacaoRules.ts` — Funções puras: shouldAutoMarkViewed(currentStatus): boolean (retorna true se 'Não Avaliado'), isAlreadyReviewed(status): boolean; usadas por useDocumentReview para decisões sem lógica inline no hook

`validacao/domain/validacaoValidation.ts` — Schema Zod para o formulário de avaliação: feedback opcional (max 1000), status obrigatório ('Validado' | 'Invalidado'); importado por DocumentReviewModal via zodResolver

`validacao/hooks/queryKeys.ts` — validacaoQueryKeys.byDocument(docId); usado para invalidar cache de documentos após validação

`validacao/hooks/useDocumentReview.ts` — usePopup para controle do modal; useMutation que chama validacaoService.create; usa validacaoRules.shouldAutoMarkViewed ao abrir o modal; em onSuccess invalida documentoQueryKeys para recarregar a lista de documentos automaticamente

`validacao/services/validacaoService.ts` — POST /validacao com { documento_id, professor_id, status, feedback }; lança BusinessRuleError se backend retornar erro de regra

`validacao/types/validacao.types.ts` — Validacao: { idvalidacao, professor_id, documento_id, status, feedback }

`validacao/components/ValidacaoActions/ValidacaoActions.tsx` — Dois botões: Invalidar e Validar; recebe isLoading do useMutation pai para desabilitar durante submissão

`validacao/components/ValidacaoActions/ValidacaoActions.types.ts` — Props: onValidar, onInvalidar, isLoading

`validacao/components/DocumentReviewModal/DocumentReviewModal.tsx` — Modal completo de avaliação com useForm + zodResolver(validacaoValidation); exibe info do aluno, recado, botão Abrir Documento, FeedbackInput, ValidacaoActions; chama validacaoRules.shouldAutoMarkViewed ao abrir; submete via useDocumentReview mutation

`validacao/components/DocumentReviewModal/DocumentReviewModal.types.ts` — Props: document: ProfessorDocument, onClose

---

### features/prazo/

`prazo/domain/prazoRules.ts` — Funções puras: isVencido(prazoFinal): boolean, isUrgente(prazoFinal, diasLimite?): boolean (padrão 7 dias), filterUrgentPrazos(prazos[]): PrazoConfig[], URGENCY_THRESHOLD_DAYS = 7; elimina a lógica de filtro inline que estava duplicada em progresso.js e sino.js do projeto original

`prazo/domain/prazoValidation.ts` — Schema Zod para edição de prazo: data obrigatória quando informada, deve ser data válida; importado por DeadlineEditorRow via zodResolver

`prazo/hooks/queryKeys.ts` — prazoQueryKeys.byAluno(alunoId); invalidado após salvar ou remover prazo

`prazo/hooks/useDeadlineManagement.ts` — useQuery para carregar prazos de um aluno (GET /prazo?aluno_id=); useMutation para salvar (POST /prazo) e para remover (DELETE /prazo/:id); mutations invalidam prazoQueryKeys.byAluno em onSuccess

`prazo/hooks/useDeadlineNotifications.ts` — Recebe prazos[] de useStudentProgress; delega filtragem para prazoRules.filterUrgentPrazos; controla badge count, isNotifModalOpen e isPrazosModalOpen via usePopup; gerencia sessionStorage para não exibir o popup automático mais de uma vez por sessão

`prazo/services/prazoService.ts` — GET /prazo, POST /prazo, DELETE /prazo/:id

`prazo/types/prazo.types.ts` — PrazoConfig: { idtipo, tipo, prazoFinal, dataLimite, intervalo_dias, vencido, urgente, jaEnviou }

`prazo/components/DeadlineEditorRow/DeadlineEditorRow.tsx` — Uma linha de prazo por tipo: exibe tipo, prazo atual, indicador vencido via prazoRules.isVencido; DateField com useForm + zodResolver(prazoValidation); botão Salvar (usa useDeadlineManagement.saveMutation); botão Remover condicional; exibe intervalo_dias

`prazo/components/DeadlineEditorRow/DeadlineEditorRow.types.ts` — Props: prazo: PrazoConfig, alunoId

`prazo/components/DeadlineEditorList/DeadlineEditorList.tsx` — Lista de DeadlineEditorRow via useDeadlineManagement.query; exibe Skeleton enquanto carrega

`prazo/components/DeadlineEditorList/DeadlineEditorList.types.ts` — Props: alunoId

`prazo/components/DeadlineNotificationModal/DeadlineNotificationModal.tsx` — Modal automático ao entrar na área do aluno: lista prazos urgentes/vencidos com StatusIcon; botão Entendido; aberto por useDeadlineNotifications.isNotifModalOpen

`prazo/components/DeadlineNotificationModal/DeadlineNotificationModal.types.ts` — Props: notificacoes: PrazoConfig[], isOpen, onClose

`prazo/components/DeadlineListModal/DeadlineListModal.tsx` — Modal aberto ao clicar no sino: todos os prazos com StatusIcon por estado (check se jaEnviou, off se vencido, clock se urgente, empty se normal) e indicador "✓ Já enviado"

`prazo/components/DeadlineListModal/DeadlineListModal.types.ts` — Props: prazos: PrazoConfig[], isOpen, onClose

---

### features/modelo/

`modelo/domain/modeloRules.ts` — Funções puras: hasModelo(modelInfo?): boolean, getDefaultDescription(tipo): string (usa documentDefaults de shared); sem efeitos colaterais

`modelo/domain/modeloValidation.ts` — Schema Zod para upload de modelo: arquivo obrigatório (File), tipo obrigatório (string não vazio), instrucoes opcional (max 2000 chars); importado por ModelUploadModal via zodResolver

`modelo/hooks/queryKeys.ts` — modeloQueryKeys.all, modeloQueryKeys.byTipo(tipo); invalidado após upload de novo modelo

`modelo/hooks/useModels.ts` — useQuery que carrega todos os modelos (GET /modelo); retorna Record<string, ModelInfo> por tipo; consumido por ModelCard para exibir link e instrucoes

`modelo/hooks/useModelUpload.ts` — useMutation que envia FormData (POST /modelo); em onSuccess invalida modeloQueryKeys.all para recarregar os cards; usa modeloValidation internamente via zodResolver no form que o chama

`modelo/hooks/useModelDownload.ts` — Dispara GET /modelo/:tipo/download via apiClient.download; inicia download de blob no browser; sem cache de TanStack Query (download direto)

`modelo/services/modeloService.ts` — GET /modelo, POST /modelo (FormData), GET /modelo/:tipo/download (blob)

`modelo/types/modelo.types.ts` — ModelInfo: { idmodelo, tipo, descricao, caminho, instrucoes }

`modelo/components/ModelCard/ModelCard.tsx` — Card com título (A/B/C), instrucoes (de modeloRules.getDefaultDescription se não houver modelo), link "Visualizar modelo atual" via modeloRules.hasModelo, slot de ação por variant

`modelo/components/ModelCard/ModelCard.types.ts` — Props: tipo, modelInfo?: ModelInfo, variant: 'student' | 'professor'

`modelo/components/ModelDownloadSection/ModelDownloadSection.tsx` — Faixa de instrução + 3 ModelCards (variant student) via useModels; botão Baixar chama useModelDownload

`modelo/components/ModelManagementSection/ModelManagementSection.tsx` — Instrução ao professor + 3 ModelCards (variant professor) via useModels; botão Novo Modelo abre ModelUploadModal via usePopup

`modelo/components/ModelUploadModal/ModelUploadModal.tsx` — Modal com useForm + zodResolver(modeloValidation); instrucoes Textarea, tipo exibido em somente leitura, ControlledField para FileUploadButton, botão Salvar via useModelUpload mutation

`modelo/components/ModelUploadModal/ModelUploadModal.types.ts` — Props: tipo: string, isOpen, onClose

---

### features/documento/

`documento/domain/documentoRules.ts` — Funções puras: isSubmittable(nome, tipo, arquivo): boolean, groupDocumentsBySection(docs[]): { ultimos, historico }, calcDashboardStats(docs[]): DashboardStats; sem efeitos colaterais; elimina lógica de agrupamento inline que estava em enviados.js

`documento/domain/documentoValidation.ts` — Schema Zod para o formulário de upload: nome obrigatório (max 100), tipo obrigatório (id de tipo), arquivo obrigatório (File); importado por DocumentUploadForm via zodResolver

`documento/hooks/queryKeys.ts` — documentoQueryKeys.byAluno(alunoId), documentoQueryKeys.byProfessor(professorId); invalidados após upload de novo documento ou após validação

`documento/hooks/useDocumentUpload.ts` — useMutation que envia FormData (POST /documento); usa documentoRules.isSubmittable como pré-validação; em onSuccess invalida documentoQueryKeys.byAluno e limpa o form via reset() do RHF

`documento/hooks/useStudentDocuments.ts` — useQuery (GET /documento?aluno_id=); aplica documentoRules.groupDocumentsBySection localmente; filtro por tipo é client-side via estado local

`documento/hooks/useProfessorDocuments.ts` — useQuery (GET /documento?professor_id= ou curso_id=); aplica documentoRules.calcDashboardStats localmente; filtros de status e tipo são client-side

`documento/services/documentoService.ts` — GET /documento, POST /documento, GET /documento/:id

`documento/types/documento.types.ts` — DocumentItem, ProfessorDocument, DocumentUploadPayload, DashboardStats

`documento/components/upload/DocumentNameInput/DocumentNameInput.tsx` — Input controlado para nome do documento; aceita register spread do RHF

`documento/components/upload/DocumentUploadForm/DocumentUploadForm.tsx` — Formulário com useForm + zodResolver(documentoValidation); DocumentNameInput, TipoSelect via ControlledField, Textarea de recado, FileUploadButton via ControlledField, botão Enviar; submete via useDocumentUpload mutation

`documento/components/upload/DocumentUploadForm/DocumentUploadForm.types.ts` — Props: onUploadSuccess callback

`documento/components/cards/DocumentCard/DocumentCard.tsx` — Card de documento: nome, tipo, StatusIcon, data, FeedbackDisplay se houver, botão Abrir Documento se caminho existir; sem lógica, apenas exibição

`documento/components/cards/DocumentCard/DocumentCard.types.ts` — Props: document: DocumentItem, highlight?: boolean

`documento/components/cards/LastDocumentCard/LastDocumentCard.tsx` — Container "Último Documento Enviado": empty state ou DocumentCard do mais recente

`documento/components/cards/LastDocumentCard/LastDocumentCard.types.ts` — Props: document?: DocumentItem

`documento/components/lists/SentDocumentsList/SentDocumentsList.tsx` — Lista de DocumentCards

`documento/components/lists/SentDocumentsList/SentDocumentsList.types.ts` — Props: documents: DocumentItem[], highlight?: boolean

`documento/components/lists/LatestDocumentsSection/LatestDocumentsSection.tsx` — SectionHeader "Últimos Enviados" + SentDocumentsList

`documento/components/lists/DocumentHistorySection/DocumentHistorySection.tsx` — SectionHeader "Histórico" + SentDocumentsList; oculto completamente quando lista vazia

`documento/components/lists/DocumentTable/DocumentTable.tsx` — DataTable visão professor: nome, tipo, aluno, RA, StatusIcon, link; clique na linha dispara onRowClick para abrir DocumentReviewModal

`documento/components/lists/DocumentTable/DocumentTable.types.ts` — Props: documents: ProfessorDocument[], onRowClick: (doc) => void

`documento/components/filters/DocumentFilters/DocumentFilters.tsx` — FilterPanel compondo StatusFilterGroup e TipoFilterGroup

`documento/components/filters/DocumentFilters/DocumentFilters.types.ts` — Props: selectedStatuses, selectedTipos, onChange

`documento/components/stats/DocumentStatsDashboard/DocumentStatsDashboard.tsx` — Quatro DashboardStatCards: Validado, Invalidado, Visualizado, Não Avaliado; recebe stats calculadas por documentoRules.calcDashboardStats

`documento/components/stats/DocumentStatsDashboard/DocumentStatsDashboard.types.ts` — Props: dashboard: DashboardStats, total: number

---

### features/aluno/

`aluno/domain/alunoRules.ts` — Funções puras: isValidRA(ra): boolean (/^\d{13}$/), isAlunoComplete(aluno): boolean (todos campos obrigatórios preenchidos), isConcluded(aluno): boolean; sem efeitos colaterais

`aluno/domain/alunoValidation.ts` — Schema Zod para cadastro manual de aluno: nome obrigatório, ra deve ter 13 dígitos via alunoRules.isValidRA com .refine(), email válido, semestre entre 1 e 6, cursoId opcional; importado por StudentRegistrationModal via zodResolver

`aluno/domain/csvRules.ts` — Função pura parseAndValidateCSV(text): { valid: ParsedStudent[], invalid: InvalidRow[] }; orquestra csvParser.parseCSV (shared) + alunoRules.isValidRA + validators.isValidEmail; define o que constitui um aluno válido no contexto de importação; a lógica de negócio da validação de CSV fica aqui, não no hook

`aluno/hooks/queryKeys.ts` — alunoQueryKeys.all, alunoQueryKeys.lists(), alunoQueryKeys.list(params), alunoQueryKeys.detail(id); invalidados após criação ou marcação como concluído

`aluno/hooks/useStudentList.ts` — useQuery (GET /aluno com params nivel, professor_id, curso_id); filtros de nome, email e semestre são client-side via estado local; usa usePagination para paginação na tabela

`aluno/hooks/useCSVImport.ts` — Gerencia estado do fluxo: parsedStudents, isPreviewOpen, errorsByRow via useState; FileReader para leitura do arquivo; chama csvRules.parseAndValidateCSV (puro, sem efeito); confirm() usa useMutation (POST /aluno/csv) e invalida alunoQueryKeys.lists em onSuccess

`aluno/hooks/useStudentRegistration.ts` — useMutation (POST /aluno); em onSuccess invalida alunoQueryKeys.lists; schema de validação importado de alunoValidation

`aluno/hooks/useStudentDetail.ts` — useQuery (GET /aluno/:id); lê parâmetro id da URL via useParams

`aluno/hooks/useConcludeStudent.ts` — useMutation (PATCH /aluno/:id/concluido); optimistic update que altera isConcluded localmente antes da resposta; rollback em onError; invalida alunoQueryKeys.detail em onSettled

`aluno/hooks/useStudentProgress.ts` — useQuery (GET /documento?aluno_id=); extrai tiposEnviados[] e prazos[]; passa prazos para useDeadlineNotifications; consumido pela StudentDashboardPage

`aluno/hooks/useStudentProfile.ts` — Chama useBaseProfile com campos específicos do aluno (nome, email, telefone); schema profileValidation de auth/domain

`aluno/services/alunoService.ts` — GET /aluno, GET /aluno/:id, POST /aluno, POST /aluno/csv, PATCH /aluno/:id/concluido

`aluno/types/aluno.types.ts` — AlunoListItem, AlunoDetalhe, AlunoProfile, ParsedStudent, InvalidRow, StudentFilterValues

`aluno/components/StudentNavBar/StudentNavBar.tsx` — AppNavBar configurado com links do aluno: home, enviados, help; rightSlot com NotificationBell conectado a useDeadlineNotifications.count; Avatar e ProfileSummary do authStore

`aluno/components/progress/DeliveryProgressTracker/DeliveryProgressTracker.tsx` — Círculos A/B/C com barras de progresso; itens em tiposEnviados ganham circleComplete; tipagem dos tipos vem dinamicamente dos dados, não hardcoded

`aluno/components/progress/DeliveryProgressTracker/DeliveryProgressTracker.types.ts` — Props: tiposEnviados: string[], allTipos: string[]

`aluno/components/management/StudentTable/StudentTable.tsx` — DataTable de alunos com Skeleton enquanto isLoading; StatusIcons dinâmicos por tipo de documento; link para detalhe do aluno

`aluno/components/management/StudentTable/StudentTable.types.ts` — Props: students: AlunoListItem[], isLoading

`aluno/components/management/StudentFilters/StudentFilters.tsx` — Inputs de nome, email e semestre com onChange debounced para filtrar localmente; botão Aplicar Filtros

`aluno/components/management/StudentFilters/StudentFilters.types.ts` — Props: onFilterChange: (filters: StudentFilterValues) => void

`aluno/components/management/CSVImportSection/CSVImportButton/CSVImportButton.tsx` — Botão btn-V "Subir Planilha CSV" com input file hidden; aceita apenas .csv; dispara FileReader em useCSVImport

`aluno/components/management/CSVImportSection/CSVPreviewTable/CSVPreviewTable.tsx` — Tabela preview dos alunos de csvRules.parseAndValidateCSV: nome, RA, email, semestre, status (válido em verde, inválido em vermelho com motivo); botão Cancelar e Confirmar Cadastro

`aluno/components/management/CSVImportSection/CSVPreviewTable/CSVPreviewTable.types.ts` — Props: parsedStudents: ParsedStudent[], invalidRows: InvalidRow[], onConfirm, onCancel

`aluno/components/management/CSVImportSection/CSVImportSection.tsx` — Orquestra o fluxo via useCSVImport: CSVImportButton → CSVPreviewTable → confirmar ou cancelar; exibe estado de loading do mutation de submit

`aluno/components/management/StudentRegistrationModal/StudentRegistrationModal.tsx` — Modal com useForm + zodResolver(alunoValidation); campos nome, RA, email, semestre, ControlledField para CourseSelect (se admin); submete via useStudentRegistration mutation

`aluno/components/management/StudentRegistrationModal/StudentRegistrationModal.types.ts` — Props: isOpen, onClose, showCourseSelect?: boolean

`aluno/components/detail/StudentProfileSection/StudentProfileSection.tsx` — Foto + dados do aluno (nome, RA, email, curso, telefone, semestre) + actionSlot para botão contextual; sem lógica própria

`aluno/components/detail/StudentProfileSection/StudentProfileSection.types.ts` — Props: aluno: AlunoDetalhe, actionSlot?: ReactNode

`aluno/components/detail/ConcludeStudentButton/ConcludeStudentButton.tsx` — Toggle btn-V / btn-link via useConcludeStudent; exibe confirm() antes de agir; reflete optimistic update imediatamente

`aluno/components/detail/ConcludeStudentButton/ConcludeStudentButton.types.ts` — Props: isConcluded, alunoId

`aluno/components/profile/StudentProfileCard/StudentProfileCard.tsx` — BaseProfileCard: leftSlot AvatarUpload, centerSlot curso do authStore, rightSlot botão Sair via useLogout

`aluno/components/profile/StudentProfileView/StudentProfileView.tsx` — BaseProfileView com campos Nome, Email, Telefone

`aluno/components/profile/StudentProfileEditForm/StudentProfileEditForm.tsx` — Cria useForm com zodResolver(profileValidation) e envolve BaseProfileEditForm em FormProvider; submete via useStudentProfile.updateMutation

`aluno/components/help/WhatIsInternshipModal/WhatIsInternshipModal.tsx` — Modal "O QUE É ESTÁGIO?" com explicação e cards dos documentos A, B e C; conteúdo estático

---

### features/professor/

`professor/domain/professorRules.ts` — Funções puras: isAdmin(nivel): boolean, canAccessAdminPanel(nivel): boolean; sem efeitos colaterais; usadas por ProfessorNavBar para exibição condicional do link admin

`professor/hooks/useProfessorProfile.ts` — Chama useBaseProfile com campos específicos do professor; schema profileValidation de auth/domain

`professor/services/professorService.ts` — Endpoints de perfil do professor não cobertos pelo authService genérico

`professor/types/professor.types.ts` — ProfessorProfile

`professor/components/ProfessorNavBar/ProfessorNavBar.tsx` — AppNavBar com links: alunos, documentos, modelos, admin (condicional via professorRules.canAccessAdminPanel), moon, accessibility; rightSlot com ProfileSummary + Avatar + ícone teacher

`professor/components/profile/ProfessorProfileCard/ProfessorProfileCard.tsx` — BaseProfileCard: leftSlot AvatarUpload, centerSlot curso do authStore, rightSlot botão Sair via useLogout

`professor/components/profile/ProfessorProfileView/ProfessorProfileView.tsx` — BaseProfileView com campos Nome, Email, Telefone

`professor/components/profile/ProfessorProfileEditForm/ProfessorProfileEditForm.tsx` — Cria useForm com zodResolver(profileValidation) e envolve BaseProfileEditForm em FormProvider; submete via useProfessorProfile.updateMutation

---

### features/curso/

`curso/domain/cursoRules.ts` — Funções puras: hasProfessorAssigned(curso): boolean, getProfessoresDisponiveis(professores[]): Professor[] (filtra os sem curso vinculado); sem efeitos colaterais

`curso/domain/cursoValidation.ts` — Schema Zod para criação de curso: nome obrigatório, professorId obrigatório; importado por CourseCreateModal via zodResolver

`curso/hooks/queryKeys.ts` — cursoQueryKeys.all, cursoQueryKeys.list(); invalidados após criar curso ou reatribuir professor

`curso/hooks/useCursos.ts` — useQuery (GET /curso); retorna lista de cursos; deduplicado — CourseSelect e CourseSelectorPanel compartilham o mesmo cache

`curso/hooks/useCourseManagement.ts` — useQuery para lista completa + useMutation para criar curso + useMutation para reatribuir professor; mutations invalidam cursoQueryKeys.all em onSuccess

`curso/services/cursoService.ts` — GET /curso, POST /curso, PATCH /curso/:id

`curso/types/curso.types.ts` — Curso: { idcurso, nomeCurso, idprofessor?, nomeProfessor? }

`curso/components/CourseSelect/CourseSelect.tsx` — Select via ControlledField + useCursos; usado em cadastros de aluno (admin) e professor

`curso/components/CourseSelect/CourseSelect.types.ts` — Props: name, control (RHF), placeholder?

`curso/components/CourseSelectorPanel/CourseSelectorPanel.tsx` — SectionHeader + CourseSelect para filtrar tabela de alunos por curso; visível apenas quando nivel === 'admin'

`curso/components/CourseList/CourseList.tsx` — Lista admin: nome do curso, professor vinculado ou "Sem professor", botão Reatribuir por item; dados via useCourseManagement.query

`curso/components/CourseList/CourseList.types.ts` — Props: onReatribuir: (curso: Curso) => void

`curso/components/CourseCreateModal/CourseCreateModal.tsx` — Modal com useForm + zodResolver(cursoValidation); input nome + ControlledField para select de professores disponíveis via cursoRules.getProfessoresDisponiveis; submete via useCourseManagement.createMutation

`curso/components/CourseCreateModal/CourseCreateModal.types.ts` — Props: isOpen, onClose

`curso/components/ReassignProfessorModal/ReassignProfessorModal.tsx` — Modal com select de todos os professores + botão Salvar; submete via useCourseManagement.reassignMutation; exibe nome do curso no header

`curso/components/ReassignProfessorModal/ReassignProfessorModal.types.ts` — Props: cursoId, nomeCurso, isOpen, onClose

---

### features/admin/

`admin/domain/adminRules.ts` — Funções puras: isAdmin(nivel): boolean, canManageEntity(nivel, entity): boolean; sem efeitos colaterais; usadas por useAdminAccess e AdminNavBar

`admin/domain/professorValidation.ts` — Schema Zod para criação de professor: nome, email, senha (min 6), telefone opcional, nivel ('professor' | 'admin'), cursoId opcional; importado por ProfessorCreateModal via zodResolver

`admin/domain/secretariaValidation.ts` — Schema Zod para criação de secretaria: nome, email, senha (min 6); importado por SecretariaCreateModal via zodResolver

`admin/hooks/queryKeys.ts` — adminQueryKeys.professors(), adminQueryKeys.secretarias(); invalidados após criar cada um

`admin/hooks/useAdminAccess.ts` — Usa adminRules.isAdmin(authStore.nivel); redireciona para rota padrão se negado; chamado no topo das pages de admin

`admin/hooks/useProfessorManagement.ts` — useQuery (GET /professor) + useMutation (POST /professor); onSuccess invalida adminQueryKeys.professors e cursoQueryKeys.all (pois professores aparecem em selects de curso)

`admin/hooks/useSecretariaManagement.ts` — useQuery (GET /secretaria) + useMutation (POST /secretaria); onSuccess invalida adminQueryKeys.secretarias

`admin/hooks/useAdminProfile.ts` — Chama useBaseProfile com campos específicos do admin; schema profileValidation de auth/domain

`admin/services/adminService.ts` — GET /professor, POST /professor, GET /secretaria, POST /secretaria

`admin/types/admin.types.ts` — AdminProfessor: { idprofessor, nome, email, nivel, idcurso?, nomeCurso? }, SecretariaItem: { idsecretaria, nome, email }

`admin/components/AdminNavBar/AdminNavBar.tsx` — AppNavBar com links: professores, secretaria, cursos, tipos, moon, accessibility; rightSlot com ProfileSummary + Avatar + ícone admin

`admin/components/professor-management/ProfessorList/ProfessorList.tsx` — Lista via useProfessorManagement.query: nome + badge nível colorido (admin em vermelho, professor em cinza) + email + curso vinculado

`admin/components/professor-management/ProfessorList/ProfessorList.types.ts` — Props: sem props; dados carregados internamente

`admin/components/professor-management/ProfessorCreateModal/ProfessorCreateModal.tsx` — Modal com useForm + zodResolver(professorValidation); campos nome, email, senha, telefone, ControlledField para select nível, ControlledField para CourseSelect; submete via useProfessorManagement.createMutation

`admin/components/professor-management/ProfessorCreateModal/ProfessorCreateModal.types.ts` — Props: isOpen, onClose

`admin/components/secretaria-management/SecretariaList/SecretariaList.tsx` — Lista via useSecretariaManagement.query: nome e email de cada secretaria

`admin/components/secretaria-management/SecretariaList/SecretariaList.types.ts` — Props: sem props; dados carregados internamente

`admin/components/secretaria-management/SecretariaCreateModal/SecretariaCreateModal.tsx` — Modal com useForm + zodResolver(secretariaValidation); campos nome, email, senha; submete via useSecretariaManagement.createMutation

`admin/components/secretaria-management/SecretariaCreateModal/SecretariaCreateModal.types.ts` — Props: isOpen, onClose

`admin/components/profile/AdminProfileCard/AdminProfileCard.tsx` — BaseProfileCard: leftSlot AvatarUpload, centerSlot identificação de nível admin, rightSlot botão Sair via useLogout

`admin/components/profile/AdminProfileView/AdminProfileView.tsx` — BaseProfileView com campos Nome, Email, Telefone

`admin/components/profile/AdminProfileEditForm/AdminProfileEditForm.tsx` — Cria useForm com zodResolver(profileValidation) e envolve BaseProfileEditForm em FormProvider; submete via useAdminProfile.updateMutation

---

### features/secretaria/

`secretaria/domain/secretariaRules.ts` — Funções puras: extractUniqueCourses(alunos[]): string[] (para popular filtro de curso); sem efeitos colaterais

`secretaria/hooks/queryKeys.ts` — secretariaQueryKeys.concludedStudents(); chave única para o cache de alunos concluídos

`secretaria/hooks/useConcludedStudents.ts` — useQuery (GET /secretaria/alunos-concluidos); filtragem client-side por cursos selecionados; usa secretariaRules.extractUniqueCourses para os filtros disponíveis; expõe alunos, total, cursosDisponiveis, filteredAlunos, selectedCourses, toggleCourse

`secretaria/hooks/useSecretariaProfile.ts` — Chama useBaseProfile com campos específicos da secretaria; schema profileValidation de auth/domain

`secretaria/services/secretariaService.ts` — GET /secretaria/alunos-concluidos

`secretaria/types/secretaria.types.ts` — ConcludedStudent, ConcludedDocument

`secretaria/components/SecretariaNavBar/SecretariaNavBar.tsx` — AppNavBar com link home da secretaria, moon, accessibility; rightSlot com ProfileSummary + botão Sair via useLogout; sem link para perfil separado na navbar

`secretaria/components/ConcludedStudentTable/ConcludedStudentTable.tsx` — DataTable: nome, RA, email, curso, StatusIcon de documentos; linha clicável expande StudentDocumentsExpander; dados via useConcludedStudents

`secretaria/components/ConcludedStudentTable/ConcludedStudentTable.types.ts` — Props: sem props; dados carregados internamente via useConcludedStudents

`secretaria/components/StudentDocumentsExpander/StudentDocumentsExpander.tsx` — Linha expandível com DocumentCards do aluno; botão Abrir com stopPropagation para não recolher a linha

`secretaria/components/StudentDocumentsExpander/StudentDocumentsExpander.types.ts` — Props: documents: ConcludedDocument[], alunoId

`secretaria/components/profile/SecretariaProfileCard/SecretariaProfileCard.tsx` — BaseProfileCard: leftSlot AvatarUpload, centerSlot identificação, rightSlot botão Sair via useLogout

`secretaria/components/profile/SecretariaProfileView/SecretariaProfileView.tsx` — BaseProfileView com campos Nome, Email, Telefone

`secretaria/components/profile/SecretariaProfileEditForm/SecretariaProfileEditForm.tsx` — Cria useForm com zodResolver(profileValidation) e envolve BaseProfileEditForm em FormProvider; submete via useSecretariaProfile.updateMutation

---

### pages/

`pages/LoginPage.tsx` — AuthLayout + LoginForm (hash #login); RecoverPasswordForm (hash #recuperar_senha); sem lógica própria

`pages/student/StudentDashboardPage.tsx` — PageLayout(StudentNavBar) + DeliveryProgressTracker + DocumentUploadForm + LastDocumentCard + ModelDownloadSection + DeadlineNotificationModal + DeadlineListModal + WhatIsInternshipModal; usa useStudentProgress para alimentar tracker e notifications

`pages/student/StudentSentDocumentsPage.tsx` — PageLayout(StudentNavBar) + TipoFilterGroup + LatestDocumentsSection + DocumentHistorySection; dados via useStudentDocuments

`pages/student/StudentProfilePage.tsx` — PageLayout(StudentNavBar) + StudentProfileCard + StudentProfileView / StudentProfileEditForm; dados via useStudentProfile

`pages/professor/ProfessorStudentsPage.tsx` — PageLayout(ProfessorNavBar) + CSVImportSection + StudentRegistrationModal + StudentFilters + CourseSelectorPanel (condicional admin) + StudentTable; dados via useStudentList

`pages/professor/ProfessorStudentDetailPage.tsx` — PageLayout(ProfessorNavBar) + StudentProfileSection com actionSlot ConcludeStudentButton + DeadlineEditorList + lista de DocumentCards; dados via useStudentDetail

`pages/professor/ProfessorDocumentsPage.tsx` — PageLayout(ProfessorNavBar) + DocumentFilters + DocumentStatsDashboard + DocumentTable + DocumentReviewModal; dados via useProfessorDocuments; modal via useDocumentReview

`pages/professor/ProfessorModelsPage.tsx` — PageLayout(ProfessorNavBar) + ModelManagementSection + ModelUploadModal; dados via useModels

`pages/professor/ProfessorProfilePage.tsx` — PageLayout(ProfessorNavBar) + ProfessorProfileCard + ProfessorProfileView / ProfessorProfileEditForm; dados via useProfessorProfile

`pages/admin/AdminPanelPage.tsx` — RoleRoute(admin) + PageLayout(AdminNavBar) + TipoList + TipoCreateForm + CourseList + CourseCreateModal + ReassignProfessorModal + ProfessorList + ProfessorCreateModal + SecretariaList + SecretariaCreateModal; guards via useAdminAccess

`pages/admin/AdminProfilePage.tsx` — RoleRoute(admin) + PageLayout(AdminNavBar) + AdminProfileCard + AdminProfileView / AdminProfileEditForm; dados via useAdminProfile

`pages/secretaria/SecretariaPage.tsx` — PageLayout(SecretariaNavBar) + DashboardStatCard "Total Concluídos" + CheckboxGroup de filtro por curso + ConcludedStudentTable; dados via useConcludedStudents

`pages/secretaria/SecretariaProfilePage.tsx` — PageLayout(SecretariaNavBar) + SecretariaProfileCard + SecretariaProfileView / SecretariaProfileEditForm; dados via useSecretariaProfile





---

[[próximo estágio]]








