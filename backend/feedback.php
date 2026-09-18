<?php
/**
 * ABTECH Educational & Learning Services
 * Central Feedback & Reviews REST API
 * Location: /api/v1/feedback.php
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Key");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

define('ADMIN_SECRET_KEY', 'abtech@admin2026');
$dataFile = __DIR__ . '/feedback_data.json';

// Seed feedback if file does not exist
if (!file_exists($dataFile)) {
    $initialFeedback = [
        [
            'id' => 'rev-1',
            'name' => 'Rahul Sen',
            'course' => 'NIOS (Class 10 & 12)',
            'rating' => 5,
            'message' => 'I had a gap year after failing in 12th standard and thought college was out of reach. ABTECH guided me step-by-step through NIOS with Transfer of Credit (TOC). I cleared with 74% in the very next cycle and got admission into B.Com!',
            'created_at' => date('Y-m-d H:i:s', time() - 172800)
        ],
        [
            'id' => 'rev-2',
            'name' => 'Priya Mukherjee',
            'course' => 'IGNOU (UG/PG Degrees)',
            'rating' => 5,
            'message' => 'Pursuing my BCA from IGNOU while working full-time in Kolkata. The assignment guidance, synopsis prep, and timely reminders from ABTECH mentors made my degree journey completely stress-free.',
            'created_at' => date('Y-m-d H:i:s', time() - 345600)
        ],
        [
            'id' => 'rev-4',
            'name' => 'Ananya Roy',
            'course' => 'BOSSE (Open Board)',
            'rating' => 5,
            'message' => 'Enrolled in BOSSE through ABTECH Barrackpore center. Fast-track verification, complete study materials, and practical exam support. Very supportive staff.',
            'created_at' => date('Y-m-d H:i:s', time() - 1209600)
        ],
        [
            'id' => 'rev-5',
            'name' => 'Debashis Chatterjee',
            'course' => 'Career Counselling',
            'rating' => 5,
            'message' => 'Had an insightful 1-on-1 career counselling session. They scientifically mapped my strengths and helped me choose the right postgraduate specialisation. Genuine and transparent advice.',
            'created_at' => date('Y-m-d H:i:s', time() - 1814400)
        ]
    ];
    file_put_contents($dataFile, json_encode($initialFeedback, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function getFeedback($dataFile) {
    if (!file_exists($dataFile)) return [];
    $content = file_get_contents($dataFile);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

function saveFeedback($dataFile, $data) {
    return file_put_contents($dataFile, json_encode(array_values($data), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

$method = $_SERVER['REQUEST_METHOD'];
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true) ?? [];

// 1. GET Feedback
if ($method === 'GET') {
    $feedbacks = getFeedback($dataFile);
    echo json_encode([
        'success' => true,
        'count' => count($feedbacks),
        'data' => $feedbacks
    ]);
    exit;
}

// 2. POST (Create or Delete)
if ($method === 'POST') {
    $action = $inputData['action'] ?? 'create';

    // Delete
    if ($action === 'delete') {
        $adminKey = $_SERVER['HTTP_X_ADMIN_KEY'] ?? ($inputData['admin_key'] ?? '');
        $feedbackId = trim($inputData['id'] ?? '');

        if ($adminKey !== ADMIN_SECRET_KEY) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Unauthorized Admin Key']);
            exit;
        }

        $feedbacks = getFeedback($dataFile);
        $filtered = array_filter($feedbacks, function($item) use ($feedbackId) {
            return $item['id'] !== $feedbackId;
        });

        saveFeedback($dataFile, $filtered);
        echo json_encode([
            'success' => true,
            'message' => 'Feedback deleted permanently',
            'deleted_id' => $feedbackId
        ]);
        exit;
    }

    // Create Feedback
    $name = trim($inputData['name'] ?? '');
    $course = trim($inputData['course'] ?? ($inputData['course_interest'] ?? 'NIOS (Class 10 & 12)'));
    $rating = intval($inputData['rating'] ?? ($inputData['stars'] ?? 5));
    $message = trim($inputData['message'] ?? ($inputData['feedback'] ?? ($inputData['text'] ?? '')));

    if (empty($name) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Name and message are required.']);
        exit;
    }

    $newEntry = [
        'id' => 'rev-' . round(microtime(true) * 1000),
        'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
        'course' => htmlspecialchars($course, ENT_QUOTES, 'UTF-8'),
        'rating' => ($rating >= 1 && $rating <= 5) ? $rating : 5,
        'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
        'created_at' => date('Y-m-d H:i:s')
    ];

    $feedbacks = getFeedback($dataFile);
    array_unshift($feedbacks, $newEntry);
    saveFeedback($dataFile, $feedbacks);

    echo json_encode([
        'success' => true,
        'message' => 'Feedback saved successfully.',
        'data' => $newEntry
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
