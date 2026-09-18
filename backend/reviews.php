<?php
/**
 * ABTECH Educational & Learning Services
 * Central Reviews & Comments REST API
 * Location: /api/V1/reviews.php
 */

// 1. CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Key");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Configuration & Admin Secret Key
// CHANGE THIS SECRET PASSWORD TO YOUR DESIRED ADMIN KEY:
define('ADMIN_SECRET_KEY', 'abtech@admin2026');

// File used to store reviews (JSON flat database)
$dataFile = __DIR__ . '/reviews_data.json';

// Initialize default reviews if file does not exist
if (!file_exists($dataFile)) {
    $initialReviews = [
        [
            'id' => 'rev-1',
            'name' => 'Rahul Sen',
            'initials' => 'RS',
            'course' => 'NIOS (Class 10 & 12)',
            'rating' => 5,
            'date' => '2 days ago',
            'timestamp' => time() * 1000 - 172800000,
            'text' => 'I had a gap year after failing in 12th standard and thought college was out of reach. ABTECH guided me step-by-step through NIOS with Transfer of Credit (TOC). I cleared with 74% in the very next cycle and got admission into B.Com!',
            'verified' => true
        ],
        [
            'id' => 'rev-2',
            'name' => 'Priya Mukherjee',
            'initials' => 'PM',
            'course' => 'IGNOU (UG/PG Degrees)',
            'rating' => 5,
            'date' => '4 days ago',
            'timestamp' => time() * 1000 - 345600000,
            'text' => 'Pursuing my BCA from IGNOU while working full-time in Kolkata. The assignment guidance, synopsis prep, and timely reminders from ABTECH mentors made my degree journey completely stress-free.',
            'verified' => true
        ],
        [
            'id' => 'rev-4',
            'name' => 'Ananya Roy',
            'initials' => 'AR',
            'course' => 'BOSSE (Open Board)',
            'rating' => 5,
            'date' => '2 weeks ago',
            'timestamp' => time() * 1000 - 1209600000,
            'text' => 'Enrolled in BOSSE through ABTECH Barrackpore center. Fast-track verification, complete study materials, and practical exam support. Very supportive staff.',
            'verified' => true
        ],
        [
            'id' => 'rev-5',
            'name' => 'Debashis Chatterjee',
            'initials' => 'DC',
            'course' => 'Career Counselling',
            'rating' => 5,
            'date' => '3 weeks ago',
            'timestamp' => time() * 1000 - 1814400000,
            'text' => 'Had an insightful 1-on-1 career counselling session. They scientifically mapped my strengths and helped me choose the right postgraduate specialisation. Genuine and transparent advice.',
            'verified' => true
        ]
    ];
    file_put_contents($dataFile, json_encode($initialReviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Helper: Read reviews from JSON file
function getReviews($dataFile) {
    if (!file_exists($dataFile)) return [];
    $content = file_get_contents($dataFile);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

// Helper: Save reviews to JSON file
function saveReviews($dataFile, $reviews) {
    return file_put_contents($dataFile, json_encode(array_values($reviews), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

// Helper: Generate Initials
function generateInitials($name) {
    $parts = preg_split('/\s+/', trim($name));
    if (count($parts) === 1) {
        return strtoupper(substr($parts[0], 0, 2));
    }
    return strtoupper(substr($parts[0], 0, 1) . substr(end($parts), 0, 1));
}

$method = $_SERVER['REQUEST_METHOD'];
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true) ?? [];

// -------------------------------------------------------------
// 3. GET: Fetch all reviews
// -------------------------------------------------------------
if ($method === 'GET') {
    $reviews = getReviews($dataFile);
    echo json_encode([
        'status' => 'success',
        'count' => count($reviews),
        'reviews' => $reviews
    ]);
    exit;
}

// -------------------------------------------------------------
// 4. POST: Add a new review OR Admin Delete
// -------------------------------------------------------------
if ($method === 'POST') {
    $action = $inputData['action'] ?? 'create';

    // ACTION: ADMIN DELETE
    if ($action === 'delete') {
        $adminKey = $_SERVER['HTTP_X_ADMIN_KEY'] ?? ($inputData['admin_key'] ?? '');
        $reviewId = trim($inputData['id'] ?? '');

        if ($adminKey !== ADMIN_SECRET_KEY) {
            http_response_code(403);
            echo json_encode([
                'status' => 'error',
                'message' => 'Unauthorized: Invalid Admin Password/Key.'
            ]);
            exit;
        }

        if (empty($reviewId)) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Review ID is required.'
            ]);
            exit;
        }

        $reviews = getReviews($dataFile);
        $filtered = array_filter($reviews, function($r) use ($reviewId) {
            return $r['id'] !== $reviewId;
        });

        if (count($reviews) === count($filtered)) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Review not found with ID: ' . $reviewId
            ]);
            exit;
        }

        saveReviews($dataFile, $filtered);

        echo json_encode([
            'status' => 'success',
            'message' => 'Review deleted permanently from central database.',
            'deleted_id' => $reviewId,
            'remaining_count' => count($filtered)
        ]);
        exit;
    }

    // ACTION: CREATE NEW REVIEW
    $name = trim($inputData['name'] ?? '');
    $course = trim($inputData['course'] ?? 'NIOS (Class 10 & 12)');
    $rating = intval($inputData['rating'] ?? 5);
    $text = trim($inputData['text'] ?? ($inputData['message'] ?? ''));

    // Validation
    if (empty($name) || strlen($name) < 2) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Name is required (at least 2 characters).']);
        exit;
    }

    if (empty($text) || strlen($text) < 10) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Review text must be at least 10 characters.']);
        exit;
    }

    if ($rating < 1 || $rating > 5) {
        $rating = 5;
    }

    // Sanitize
    $cleanName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $cleanCourse = htmlspecialchars($course, ENT_QUOTES, 'UTF-8');
    $cleanText = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');

    $newReview = [
        'id' => 'rev-' . round(microtime(true) * 1000),
        'name' => $cleanName,
        'initials' => generateInitials($cleanName),
        'course' => $cleanCourse,
        'rating' => $rating,
        'date' => 'Just now',
        'timestamp' => time() * 1000,
        'text' => $cleanText,
        'verified' => true
    ];

    $reviews = getReviews($dataFile);
    // Prepend to top
    array_unshift($reviews, $newReview);
    saveReviews($dataFile, $reviews);

    echo json_encode([
        'status' => 'success',
        'message' => 'Review submitted and saved to central database.',
        'review' => $newReview
    ]);
    exit;
}

// -------------------------------------------------------------
// 5. DELETE HTTP Method
// -------------------------------------------------------------
if ($method === 'DELETE') {
    $adminKey = $_SERVER['HTTP_X_ADMIN_KEY'] ?? ($inputData['admin_key'] ?? '');
    $reviewId = $_GET['id'] ?? ($inputData['id'] ?? '');

    if ($adminKey !== ADMIN_SECRET_KEY) {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Invalid Admin Key.']);
        exit;
    }

    $reviews = getReviews($dataFile);
    $filtered = array_filter($reviews, function($r) use ($reviewId) {
        return $r['id'] !== $reviewId;
    });

    saveReviews($dataFile, $filtered);
    echo json_encode([
        'status' => 'success',
        'message' => 'Review deleted permanently.',
        'deleted_id' => $reviewId
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
