import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AccessRequiredPage, FounderOnly, RequireAuth } from "./components/AccessGate";
import { AppShell, PublicShell } from "./components/Shell";
import { MyProfilePage, PlansPage, SettingsPage } from "./pages/AccountPages";
import { CeoPage } from "./pages/CeoPage";
import { DashboardHome } from "./pages/DashboardHome";
import { GsnNewPage, GsnPage } from "./pages/GsnPages";
import {
  OnboardPlanPage,
  OnboardPreferencesPage,
  OnboardRolePage,
  PostAuthPage,
} from "./pages/OnboardPages";
import { PerspectivesPage } from "./pages/PerspectivesPage";
import {
  ContactPage,
  ForgotPasswordPage,
  LegalPage,
  ParkedPage,
  PricingPage,
  RootRedirect,
  SearchPage,
  SignInPage,
  SignUpPage,
  ToolsPage,
} from "./pages/PublicPages";
import { useSession } from "./lib/session";
import { ReviewPage } from "./pages/ReviewPage";
import {
  BudgetPage,
  DeIdentificationPage,
  DiscoveryPage,
  EquityPage,
  GapAnalysisPage,
  InternationalPage,
  LearningCenterPage,
  OpenerPage,
  PreAwardPage,
  ResubmissionPage,
  StudySectionPage,
  SummaryStatementPage,
  TraineeHubPage,
} from "./pages/Wave2Pages";
import {
  KAwardPage,
  MentorHubPage,
  MentorMatchingPage,
  MentorQualityPage,
  MentorSessionPage,
} from "./pages/Wave3Pages";
import {
  CompliancePage,
  NcePage,
  PortfolioPage,
  PostAwardPage,
  RpprPage,
  SubawardPage,
  TrackerPage,
} from "./pages/Wave4Pages";
import {
  DeptChairPage,
  InstitutionalPage,
  InstitutionalWorkflowsPage,
  PilotPage,
  T32PdNewPage,
  T32PdPage,
} from "./pages/Wave5Pages";

function AutoShell() {
  const { user } = useSession();
  return user ? <AppShell /> : <PublicShell />;
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route element={<PublicShell />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/access-required" element={<AccessRequiredPage />} />
          <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" />} />
          <Route path="/terms-of-service" element={<LegalPage title="Terms of Service" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pilot" element={<PilotPage />} />
          <Route path="/live" element={<ParkedPage name="Live" />} />
          <Route path="/global" element={<ParkedPage name="Global" />} />
        </Route>

        <Route path="/" element={<RootRedirect />} />
        <Route element={<AutoShell />}>
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/review/:token" element={<ReviewPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<AppShell />}>
            <Route path="/post-auth" element={<PostAuthPage />} />
            <Route path="/onboard" element={<OnboardRolePage />} />
            <Route path="/onboard/plan" element={<OnboardPlanPage />} />
            <Route path="/onboard/preferences" element={<OnboardPreferencesPage />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" />} />
            <Route path="/terms-of-service" element={<LegalPage title="Terms of Service" />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/dashboard/gsn/new" element={<GsnNewPage />} />
            <Route path="/dashboard/gsn" element={<GsnPage />} />
            <Route path="/dashboard/study-section" element={<StudySectionPage />} />
            <Route path="/dashboard/opener" element={<OpenerPage />} />
            <Route path="/dashboard/equity" element={<EquityPage />} />
            <Route path="/dashboard/gap-analysis" element={<GapAnalysisPage />} />
            <Route path="/dashboard/reviewer-perspectives" element={<PerspectivesPage />} />
            <Route path="/dashboard/plans" element={<PlansPage />} />
            <Route path="/my-profile" element={<MyProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/dashboard/discovery" element={<DiscoveryPage />} />
            <Route path="/dashboard/budget" element={<BudgetPage />} />
            <Route path="/dashboard/pre-award" element={<PreAwardPage />} />
            <Route path="/dashboard/summary-statement" element={<SummaryStatementPage />} />
            <Route path="/dashboard/de-identification" element={<DeIdentificationPage />} />
            <Route path="/learning-center" element={<LearningCenterPage />} />
            <Route path="/dashboard/trainee" element={<TraineeHubPage />} />
            <Route path="/dashboard/resubmission" element={<ResubmissionPage />} />
            <Route path="/dashboard/international" element={<InternationalPage />} />
            <Route path="/dashboard/mentor" element={<MentorHubPage />} />
            <Route path="/dashboard/mentor-matching" element={<MentorMatchingPage />} />
            <Route path="/dashboard/mentor-session" element={<MentorSessionPage />} />
            <Route path="/dashboard/mentor-quality" element={<MentorQualityPage />} />
            <Route path="/dashboard/k-award" element={<KAwardPage />} />
            <Route path="/dashboard/post-award" element={<PostAwardPage />} />
            <Route path="/dashboard/nce" element={<NcePage />} />
            <Route path="/dashboard/rppr" element={<RpprPage />} />
            <Route path="/dashboard/tracker" element={<TrackerPage />} />
            <Route path="/dashboard/portfolio-strategy" element={<PortfolioPage />} />
            <Route path="/dashboard/subaward" element={<SubawardPage />} />
            <Route path="/dashboard/compliance" element={<CompliancePage />} />
            <Route path="/dashboard/institutional" element={<InstitutionalPage />} />
            <Route path="/dashboard/dept-chair" element={<DeptChairPage />} />
            <Route path="/dashboard/institutional/workflows" element={<InstitutionalWorkflowsPage />} />
            <Route path="/dashboard/t32pd" element={<T32PdPage />} />
            <Route path="/dashboard/t32pd/new" element={<T32PdNewPage />} />
            <Route element={<FounderOnly />}>
              <Route path="/dashboard/ceo" element={<CeoPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
