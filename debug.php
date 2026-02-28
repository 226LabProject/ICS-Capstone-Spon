<?php
// ============================================================
// debug.php — Temporary path/permission diagnostic
// DELETE THIS FILE after debugging is complete.
// ============================================================

$thisDir   = __DIR__;
$leadsDir  = __DIR__ . '/./sponsorship-leads/';
$realLeads = realpath($leadsDir);

echo "<pre>";
echo "submit.php location (__DIR__):\n  " . $thisDir . "\n\n";
echo "Target leads path (unresolved):\n  " . $leadsDir . "\n\n";
echo "Target leads path (realpath):\n  " . ($realLeads ?: "COULD NOT RESOLVE — directory may not exist") . "\n\n";
echo "Directory exists:  " . (is_dir($leadsDir)    ? "YES" : "NO")  . "\n";
echo "Directory writable: " . (is_writable($leadsDir) ? "YES" : "NO") . "\n\n";

// Check one level up to see what's there
$parent = realpath(__DIR__ . '/../');
echo "Parent directory (realpath):\n  " . ($parent ?: "COULD NOT RESOLVE") . "\n\n";

if ($parent) {
    echo "Contents of parent directory:\n";
    foreach (scandir($parent) as $item) {
        if ($item === '.' || $item === '..') continue;
        $full = $parent . '/' . $item;
        echo "  " . (is_dir($full) ? '[DIR] ' : '[FILE]') . " " . $item . "\n";
    }
}
echo "</pre>";
