<!-- Once logged, this is the main page (index.php), where users can create or join new games -->
<div id="container">
    <div id="game-box">
        <?php echo "<div id=\"game-title\"> Welcome back {$_SESSION['user']}! </div>"?>
        <div id="inner-container">

            <a class="button" id="new-game">
                Start a new game
            </a>
            <a class="button" id="load-game">
                Join a game
            </a>
        </div>
    </div>
</div>