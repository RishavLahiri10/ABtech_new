import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const searchIndex = [
  // Services & Boards
  {
    id: 'nios-service',
    title: 'NIOS (10th & 12th Open Schooling)',
    subtitle: 'Secondary & Senior Secondary Open Schooling admissions, TOC, and exam guidance',
    category: 'Services & Boards',
    badge: 'Class 10 & 12',
    type: 'internal',
    to: '/services#nios',
    icon: 'graduation',
    keywords: [
      'nios',
      'national institute of open schooling',
      '10th',
      '12th',
      'secondary',
      'senior secondary',
      'open board',
      'open schooling',
      'toc',
      'transfer of credit',
      'failed',
      'drop out',
      'stream 1',
      'stream 2',
      'stream 3',
      'stream 4',
      'ode',
      'on demand exam',
    ],
  },
  {
    id: 'bosse-service',
    title: 'BOSSE Open Schooling Board',
    subtitle: 'Board of Open Schooling & Skill Education (Secondary & Sr. Secondary)',
    category: 'Services & Boards',
    badge: 'Open Board',
    type: 'internal',
    to: '/services#bosse',
    icon: 'award',
    keywords: [
      'bosse',
      'board of open schooling',
      'skill education',
      'sikkim open board',
      'secondary',
      'senior secondary',
      'vocational',
      'fast track',
      'class 10',
      'class 12',
    ],
  },
  {
    id: 'ignou-service',
    title: 'IGNOU University Degrees & Diplomas',
    subtitle: 'B.A, B.Com, B.Sc, BCA, BBA, M.A, M.Com, MBA, MCA, MSW, PG Diplomas',
    category: 'Services & Boards',
    badge: 'UG / PG Degrees',
    type: 'internal',
    to: '/services#ignou',
    icon: 'book',
    keywords: [
      'ignou',
      'indira gandhi national open university',
      'distance degree',
      'bca',
      'bba',
      'ba',
      'bcom',
      'bsc',
      'ma',
      'mcom',
      'mba',
      'mca',
      'msw',
      'pg diploma',
      'assignment',
      'synopsis',
      'project',
    ],
  },
  {
    id: 'college-admissions-service',
    title: 'Guidance College Admissions',
    subtitle: 'B.Tech, Polytechnic, BCA, MCA, BBA, MBA, BALLB, LLB, Nursing, B.Pharm',
    category: 'Services & Boards',
    badge: 'Regular Colleges',
    type: 'internal',
    to: '/services#college-admissions',
    icon: 'building',
    keywords: [
      'college admissions',
      'regular colleges',
      'btech',
      'engineering',
      'polytechnic',
      'bba',
      'mba',
      'law',
      'ballb',
      'llb',
      'nursing',
      'gnm',
      'bsc nursing',
      'pharmacy',
      'bpharm',
      'dpharm',
      'paramedical',
      'kolkata colleges',
    ],
  },
  {
    id: 'career-counselling-service',
    title: 'Career Counselling & Mentorship',
    subtitle: 'Personalized 1-on-1 career mapping, stream selection, and aptitude profiling',
    category: 'Services & Boards',
    badge: '1-on-1 Mentorship',
    type: 'internal',
    to: '/services#career-counselling',
    icon: 'user-check',
    keywords: [
      'career counselling',
      'counseling',
      'mentorship',
      'stream selection',
      'after 10th',
      'after 12th',
      'aptitude assessment',
      'future guidance',
      'career roadmap',
    ],
  },

  // Admission & Inquiry Forms
  {
    id: 'nios-inquiry',
    title: 'NIOS Admission & Inquiry Form',
    subtitle: 'Apply for NIOS Class 10 & Class 12 2026–2027 admission cycles',
    category: 'Admissions & Forms',
    badge: 'Direct Form',
    type: 'modal',
    icon: 'form',
    modalConfig: {
      formName: 'NIOS Admission Form',
      title: 'NIOS ADMISSION FORM',
      eyebrow: 'ABTECH LEARNING SERVICES · NIOS',
      subtitle: 'Apply for NIOS Secondary & Senior Secondary 2026–2027 admission cycles.',
      course: 'NIOS — Class 10 & 12',
    },
    keywords: [
      'nios admission',
      'nios admission form',
      'apply nios',
      'nios registration',
      'nios inquiry',
      'admission 2026',
      'admission 2027',
      'secondary admission',
      'sr secondary admission',
    ],
  },
  {
    id: 'bosse-inquiry',
    title: 'BOSSE Admission & Inquiry Form',
    subtitle: 'Direct registration & guidance for BOSSE Secondary & Sr. Secondary',
    category: 'Admissions & Forms',
    badge: 'Direct Form',
    type: 'modal',
    icon: 'form',
    modalConfig: {
      formName: 'BOSSE Admission Form',
      title: 'BOSSE ADMISSION FORM',
      eyebrow: 'ABTECH LEARNING SERVICES · BOSSE',
      subtitle: 'Direct registration, verification, and fast-track guidance for BOSSE Secondary & Sr. Secondary.',
      course: 'BOSSE — Open Board',
    },
    keywords: [
      'bosse admission',
      'bosse admission form',
      'apply bosse',
      'bosse registration',
      'bosse inquiry',
      'open board admission',
    ],
  },
  {
    id: 'ignou-inquiry',
    title: 'IGNOU Admission & Guidance Form',
    subtitle: 'Admissions, re-registration, project synopsis, and assignment assistance',
    category: 'Admissions & Forms',
    badge: 'Direct Form',
    type: 'modal',
    icon: 'form',
    modalConfig: {
      formName: 'IGNOU Admission Form',
      title: 'IGNOU ADMISSION FORM',
      eyebrow: 'ABTECH LEARNING SERVICES · IGNOU',
      subtitle: 'Admissions, re-registration, project synopsis, and exam assistance for IGNOU degrees.',
      course: 'IGNOU — Degree & Diploma',
    },
    keywords: [
      'ignou admission',
      'ignou form',
      'apply ignou',
      'ignou registration',
      'ignou degree inquiry',
      'samarth admission form',
    ],
  },
  {
    id: 'general-inquiry',
    title: 'Book Free Counselling & Admission Guidance',
    subtitle: 'Speak with our academic experts in Barrackpore for personalized counselling',
    category: 'Admissions & Forms',
    badge: 'Free Guidance',
    type: 'modal',
    icon: 'sparkles',
    modalConfig: {
      formName: 'General Admission Guidance',
      title: 'GENERAL ADMISSION GUIDANCE',
      eyebrow: 'ABTECH LEARNING SERVICES',
      subtitle: 'Connect with a certified counsellor for personalized academic & career guidance.',
      course: 'General Admission Guidance',
    },
    keywords: [
      'counselling',
      'counselor',
      'speak to counselor',
      'free consultation',
      'enquiry',
      'inquire',
      'admission fee',
      'eligibility check',
      'contact counselor',
    ],
  },

  // Syllabus & Curriculum
  {
    id: 'syllabus-10',
    title: 'NIOS Class X (10th) Syllabus & Subjects',
    subtitle: 'Maths (211), Science (212), Social Science (213), Economics, Data Entry, Languages',
    category: 'Syllabus & Curriculum',
    badge: 'Class 10 Syllabus',
    type: 'internal',
    to: '/services#syllabus-class-10',
    icon: 'file-text',
    keywords: [
      'syllabus class 10',
      '10th syllabus',
      'class 10 subjects',
      'nios 10th syllabus',
      'secondary syllabus',
      'maths 211',
      'science 212',
      'social science 213',
      'economics 214',
      'business studies 215',
      'data entry 229',
      'home science 216',
      'painting 225',
      'bengali 203',
      'hindi 201',
      'english 202',
    ],
  },
  {
    id: 'syllabus-12',
    title: 'NIOS Class XII (12th) Syllabus & Subjects',
    subtitle: 'Science (Physics, Chem, Bio, Maths), Commerce (Accounts, BST, Eco), Humanities',
    category: 'Syllabus & Curriculum',
    badge: 'Class 12 Syllabus',
    type: 'internal',
    to: '/services#syllabus-class-12',
    icon: 'file-text',
    keywords: [
      'syllabus class 12',
      '12th syllabus',
      'class 12 subjects',
      'nios 12th syllabus',
      'sr secondary syllabus',
      'physics 312',
      'chemistry 313',
      'biology 314',
      'maths 311',
      'computer science 330',
      'accountancy 320',
      'business studies 319',
      'economics 318',
      'history 315',
      'geography 316',
      'pol science 317',
      'sociology 331',
      'psychology 328',
    ],
  },
  {
    id: 'nios-subject-list-pdf',
    title: 'Download NIOS Available Subject List (Official PDF)',
    subtitle: 'Complete official list of all recognized secondary & sr. secondary subjects',
    category: 'Syllabus & Curriculum',
    badge: 'Official PDF ↗',
    type: 'external',
    href: 'https://sdmis.nios.ac.in/static/dist/images/pdf/subjects-available/subjects-available.pdf',
    icon: 'download',
    keywords: [
      'nios subject list',
      'subject list pdf',
      'download subject list',
      'nios subjects',
      'subject codes',
      'sdmis pdf',
    ],
  },
  {
    id: 'nios-class-10-books',
    title: 'Download Class X Official Syllabus & Books (PDF)',
    subtitle: 'Official secondary course study material & textbooks',
    category: 'Syllabus & Curriculum',
    badge: 'Official Study Material ↗',
    type: 'external',
    href: 'https://rcpune.nios.ac.in/secondary-courses-materials',
    icon: 'download',
    keywords: [
      'nios 10th books',
      'class x books pdf',
      'study material 10th',
      'download books 10th',
      'secondary study materials',
    ],
  },
  {
    id: 'nios-class-12-books',
    title: 'Download Class XII Official Syllabus & Books (PDF)',
    subtitle: 'Official senior secondary science, commerce & humanities textbooks',
    category: 'Syllabus & Curriculum',
    badge: 'Official Study Material ↗',
    type: 'external',
    href: 'https://rcpune.nios.ac.in/senior-secondary-courses-material',
    icon: 'download',
    keywords: [
      'nios 12th books',
      'class xii books pdf',
      'study material 12th',
      'science books',
      'commerce books',
      'humanities books',
    ],
  },

  // Official Tools & Portals
  {
    id: 'nios-admit-card',
    title: 'Download NIOS Hall Ticket / Admit Card',
    subtitle: 'Direct link to SDMIS portal for Practical & Theory examination hall tickets',
    category: 'Official Portals & Tools',
    badge: 'Hall Ticket ↗',
    type: 'external',
    href: 'https://sdmis.nios.ac.in/search/hall-ticket',
    icon: 'external-link',
    keywords: [
      'admit card',
      'hall ticket',
      'download admit card',
      'exam hall ticket',
      'nios admit card',
      'sdmis hall ticket',
      'practical admit card',
      'theory admit card',
    ],
  },
  {
    id: 'nios-admission-status',
    title: 'Check NIOS Admission Status',
    subtitle: 'Track your NIOS registration using reference or enrollment number',
    category: 'Official Portals & Tools',
    badge: 'Status Check ↗',
    type: 'external',
    href: 'https://sdmis.nios.ac.in/registration/check-admission-status',
    icon: 'external-link',
    keywords: [
      'admission status',
      'track admission',
      'check status',
      'nios status',
      'enrollment status',
      'reference number track',
    ],
  },
  {
    id: 'nios-results',
    title: 'Check NIOS Exam Results',
    subtitle: 'Public Examination & On-Demand Examination (ODE) online results',
    category: 'Official Portals & Tools',
    badge: 'Exam Results ↗',
    type: 'external',
    href: 'https://results.nios.ac.in/home/on-demand?type=2',
    icon: 'external-link',
    keywords: [
      'nios result',
      'check result',
      'exam result',
      'marksheet',
      'on demand result',
      'public exam result',
      'secondary result',
      'sr secondary result',
    ],
  },
  {
    id: 'bosse-portal',
    title: 'Official BOSSE Website Portal',
    subtitle: 'Direct link to Board of Open Schooling & Skill Education official website',
    category: 'Official Portals & Tools',
    badge: 'BOSSE Portal ↗',
    type: 'external',
    href: 'https://www.bosse.ac.in/',
    icon: 'external-link',
    keywords: ['bosse portal', 'bosse website', 'bosse ac in', 'official bosse'],
  },
  {
    id: 'bosse-verification',
    title: 'BOSSE Student Verification & Results',
    subtitle: 'Verify student admission & check examination marksheets online',
    category: 'Official Portals & Tools',
    badge: 'Verification ↗',
    type: 'external',
    href: 'https://www.bosse.ac.in/student-verification/',
    icon: 'external-link',
    keywords: [
      'bosse verification',
      'bosse result',
      'student verification',
      'verify marksheet',
      'check bosse marks',
    ],
  },
  {
    id: 'ignou-portal',
    title: 'Official IGNOU University Portal',
    subtitle: 'Direct link to Indira Gandhi National Open University main website',
    category: 'Official Portals & Tools',
    badge: 'IGNOU Portal ↗',
    type: 'external',
    href: 'https://www.ignou.ac.in/',
    icon: 'external-link',
    keywords: ['ignou portal', 'ignou website', 'ignou ac in', 'official ignou'],
  },
  {
    id: 'ignou-samarth',
    title: 'IGNOU Samarth Fresh Admission Portal',
    subtitle: 'Apply for fresh UG, PG, Diploma & Certificate courses online',
    category: 'Official Portals & Tools',
    badge: 'Samarth Portal ↗',
    type: 'external',
    href: 'https://ignouadmission.samarth.edu.in/',
    icon: 'external-link',
    keywords: [
      'samarth admission',
      'ignou samarth',
      'fresh admission',
      'ignou online apply',
      'january cycle',
      'july cycle',
    ],
  },
  {
    id: 'ignou-reregistration',
    title: 'IGNOU Online Re-Registration Portal',
    subtitle: 'Re-register for next semester or academic year degree courses',
    category: 'Official Portals & Tools',
    badge: 'Re-Registration ↗',
    type: 'external',
    href: 'https://onlinerr.ignou.ac.in/',
    icon: 'external-link',
    keywords: [
      'ignou re registration',
      're registration portal',
      'next semester',
      'next year registration',
      'rr portal',
    ],
  },
  {
    id: 'ignou-assignments',
    title: 'IGNOU Assignments & Question Papers',
    subtitle: 'Download latest question papers and assignment booklets',
    category: 'Official Portals & Tools',
    badge: 'Assignments ↗',
    type: 'external',
    href: 'https://webservices.ignou.ac.in/assignments/',
    icon: 'external-link',
    keywords: [
      'ignou assignment',
      'assignment question papers',
      'solved assignments',
      'tma ignou',
      'question booklet',
    ],
  },
  {
    id: 'ignou-gradecard',
    title: 'IGNOU Student Grade Card & Results',
    subtitle: 'Check Term-End Examination (TEE) grade card and marksheet',
    category: 'Official Portals & Tools',
    badge: 'Grade Card ↗',
    type: 'external',
    href: 'https://gradecard.ignou.ac.in/gradecard/',
    icon: 'external-link',
    keywords: [
      'ignou grade card',
      'ignou result',
      'grade card check',
      'tee results',
      'term end exam marks',
    ],
  },

  // Pages & Location
  {
    id: 'page-home',
    title: 'Home Page',
    subtitle: 'ABTECH overview, highlighted pathways, why choose us & student reviews',
    category: 'Site Pages',
    badge: 'Page',
    type: 'internal',
    to: '/',
    icon: 'home',
    keywords: ['home', 'main page', 'abtech learning', 'barrackpore', 'overview'],
  },
  {
    id: 'page-about',
    title: 'About ABTECH',
    subtitle: 'Our mission, accreditation standards, academic mentors & guidance approach',
    category: 'Site Pages',
    badge: 'Page',
    type: 'internal',
    to: '/about',
    icon: 'info',
    keywords: ['about us', 'about abtech', 'mission', 'mentors', 'why abtech', 'accreditations', 'experience'],
  },
  {
    id: 'page-services',
    title: 'All Services & Academic Programs',
    subtitle: 'Explore all open schooling, distance degrees, college admissions & counselling',
    category: 'Site Pages',
    badge: 'Page',
    type: 'internal',
    to: '/services',
    icon: 'grid',
    keywords: ['services', 'courses', 'programs', 'degrees', 'open schooling', 'admissions'],
  },
  {
    id: 'page-contact',
    title: 'Contact & Barrackpore Office Location',
    subtitle: 'S N Banerjee Road, Phari Lane, Charnak, Barrackpore, Kolkata 700120',
    category: 'Site Pages',
    badge: 'Location & Map',
    type: 'internal',
    to: '/contact',
    icon: 'map-pin',
    keywords: [
      'contact',
      'address',
      'location',
      'phone',
      'email',
      'map',
      'barrackpore office',
      'phari lane',
      'charnak',
      'how to reach',
      'hours',
    ],
  },
  {
    id: 'page-reviews',
    title: 'Student Reviews & Success Stories',
    subtitle: '4.9/5 rated real-time student ratings, feedback & alumni testimonials',
    category: 'Site Pages',
    badge: 'Reviews',
    type: 'internal',
    to: '/#reviews',
    icon: 'star',
    keywords: ['reviews', 'testimonials', 'ratings', 'feedback', 'student reviews', 'success stories', 'comments'],
  },
  {
    id: 'action-call',
    title: 'Call ABTECH Helpline (+91 7980874530)',
    subtitle: 'Speak directly with an admission counsellor (Mon–Sat 10 AM – 8 PM)',
    category: 'Quick Contact',
    badge: 'Direct Call',
    type: 'tel',
    href: 'tel:+917980874530',
    icon: 'phone',
    keywords: ['call', 'phone number', 'helpline', 'contact number', 'mobile', 'speak to counsellor', 'phone call'],
  },
  {
    id: 'action-whatsapp',
    title: 'Chat with ABTECH on WhatsApp',
    subtitle: 'Instant response for course eligibility, syllabus, and admission queries',
    category: 'Quick Contact',
    badge: 'WhatsApp',
    type: 'external',
    href: 'https://wa.me/917980874530?text=Hello%20ABTECH%2C%20I%20would%20like%20to%20inquire%20about%20admissions%20and%20courses.',
    icon: 'message-circle',
    keywords: ['whatsapp', 'chat', 'message', 'instant help', 'online chat', 'whatsapp number'],
  },
];

const POPULAR_PILLS = [
  'NIOS 10th & 12th',
  'IGNOU Degrees',
  'BOSSE Board',
  'Syllabus',
  'Admit Card',
  'Admission Form',
  'Exam Results',
  'Contact',
];

function renderIcon(type) {
  switch (type) {
    case 'graduation':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      );
    case 'book':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      );
    case 'award':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      );
    case 'building':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"></path>
        </svg>
      );
    case 'user-check':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <polyline points="16 11 18 13 22 9"></polyline>
        </svg>
      );
    case 'form':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    case 'file-text':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="12" y1="9" x2="8" y2="9"></line>
        </svg>
      );
    case 'download':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      );
    case 'external-link':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      );
    case 'star':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    case 'map-pin':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      );
    case 'phone':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      );
    case 'message-circle':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      );
    case 'home':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );
    case 'info':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      );
  }
}

/**
 * Highlights matches in text safely
 */
function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) return <span>{text}</span>;

  // Regex to match any terms
  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function SearchBar({ onOpenInquiry, onNavigate, isMobileNav = false }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Filter items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const terms = q.split(/\s+/).filter(Boolean);

    return searchIndex.filter((item) => {
      const title = item.title.toLowerCase();
      const subtitle = (item.subtitle || '').toLowerCase();
      const category = (item.category || '').toLowerCase();
      const badge = (item.badge || '').toLowerCase();
      const keywords = (item.keywords || []).join(' ').toLowerCase();
      const searchBlob = `${title} ${subtitle} ${category} ${badge} ${keywords}`;

      return terms.every((term) => searchBlob.includes(term));
    });
  }, [query]);

  // Group filtered items by category
  const groupedResults = useMemo(() => {
    const groups = {};
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Keyboard Shortcut: Ctrl+K or Cmd+K or "/"
  useEffect(() => {
    function handleKeyDown(e) {
      if (
        (e.key === 'k' && (e.ctrlKey || e.metaKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
          setIsOpen(true);
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleSelectItem = (item) => {
    setIsOpen(false);
    setQuery('');
    if (onNavigate) onNavigate();

    if (item.type === 'modal') {
      if (onOpenInquiry) {
        onOpenInquiry(item.modalConfig);
      }
    } else if (item.type === 'external') {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'tel') {
      window.location.href = item.href;
    } else if (item.type === 'internal') {
      navigate(item.to);
      if (item.to.includes('#')) {
        const hash = item.to.split('#')[1];
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen || filteredItems.length === 0) {
      if (e.key === 'ArrowDown' && query.trim()) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    }
  };

  const handlePillClick = (pill) => {
    setQuery(pill);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`search-bar-wrap ${isMobileNav ? 'search-bar-mobile' : 'search-bar-desktop'}`}
      ref={searchContainerRef}
      role="search"
      aria-label="Search courses, boards, syllabus, and forms"
    >
      <div className={`search-input-box ${isOpen ? 'is-focused' : ''}`}>
        <span className="search-icon" aria-hidden="true">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>

        <input
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder="Search courses, syllabus, forms..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDownInput}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="menu-search-results"
          aria-label="Search courses, syllabus, portals, and admissions"
          autoComplete="off"
        />

        {query ? (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search input"
          >
            ✕
          </button>
        ) : (
          <span className="search-shortcut-hint" aria-hidden="true" title="Quick shortcut">
            <kbd>Ctrl</kbd> <kbd>K</kbd>
          </span>
        )}
      </div>

      {/* Dropdown Results Popover */}
      {isOpen && (
        <div
          id="menu-search-results"
          className="search-results-popover"
          ref={resultsRef}
          role="listbox"
        >
          {query.trim() === '' ? (
            <div className="search-initial-view">
              <div className="search-pill-header">
                <span className="search-pill-title">Popular Searches &amp; Topics:</span>
              </div>
              <div className="search-pills-list">
                {POPULAR_PILLS.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    className="search-pill"
                    onClick={() => handlePillClick(pill)}
                  >
                    <span>{pill}</span>
                  </button>
                ))}
              </div>
              <div className="search-quick-tip">
                <span>💡 Type any subject, board name, syllabus, or admission query to search instantly.</span>
              </div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="search-results-list">
              <div className="search-results-count-bar">
                <span>
                  Found <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'match' : 'matches'}
                </span>
                <span className="search-hint-nav">Use ↑ ↓ arrows &amp; Enter</span>
              </div>

              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="search-category-group">
                  <div className="search-category-header">
                    <span>{category}</span>
                    <span className="search-category-count">{items.length}</span>
                  </div>

                  {items.map((item) => {
                    const itemGlobalIndex = filteredItems.findIndex((fi) => fi.id === item.id);
                    const isSelected = itemGlobalIndex === selectedIndex;

                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        className={`search-result-item ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(itemGlobalIndex)}
                      >
                        <div className="search-item-icon-wrap" aria-hidden="true">
                          {renderIcon(item.icon)}
                        </div>

                        <div className="search-item-info">
                          <div className="search-item-title-row">
                            <span className="search-item-title">
                              <HighlightText text={item.title} query={query} />
                            </span>
                            {item.badge && (
                              <span className="search-item-badge">{item.badge}</span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="search-item-subtitle">
                              <HighlightText text={item.subtitle} query={query} />
                            </p>
                          )}
                        </div>

                        <div className="search-item-arrow" aria-hidden="true">
                          {item.type === 'modal' ? (
                            <span className="search-action-tag">Apply ↗</span>
                          ) : item.type === 'external' ? (
                            <span className="search-action-tag">Open ↗</span>
                          ) : item.type === 'tel' ? (
                            <span className="search-action-tag">Call ↗</span>
                          ) : (
                            <span className="search-action-arrow">›</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="search-no-results">
              <div className="search-no-results-icon" aria-hidden="true">🔍</div>
              <h4>No matches found for &ldquo;{query}&rdquo;</h4>
              <p>Looking for a specific course or personalized advice?</p>
              <div className="search-no-results-actions">
                <button
                  type="button"
                  className="button button-maroon button-sm"
                  onClick={() => {
                    setIsOpen(false);
                    if (onOpenInquiry) {
                      onOpenInquiry({
                        formName: 'Search Inquiry',
                        title: 'ADMISSION INQUIRY',
                        eyebrow: 'ABTECH LEARNING SERVICES',
                        subtitle: `Guidance for your search: "${query}". Our counselor will contact you.`,
                        course: 'General Admission Guidance',
                      });
                    }
                  }}
                >
                  Inquire Directly ↗
                </button>
                <button
                  type="button"
                  className="button button-outline-maroon button-sm"
                  onClick={() => {
                    setQuery('');
                    setIsOpen(false);
                    navigate('/services');
                  }}
                >
                  Browse All Services
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
