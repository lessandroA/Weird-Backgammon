<nav>
    <ul id="navbar-ul">
        <li class="navbar-li">
            <a href="index.php">
            Home
            </a>
        </li>
        <li class="navbar-li">
            <a href="../html/documentazione.html">
                Help
            </a>
        </li>
        
        <?php
            if(isset($_SESSION['logged']) && $_SESSION['logged'] == TRUE){
                echo "
                    <li class=\"navbar-li\">
                        <a href=\"logout.php\">
                            Logout
                        </a>
                    </li>
                    ";
            } else {
                echo "
                <li class=\"navbar-li\">
                    <a href=\"login.php\">
                        Login
                    </a>
                </li>
                ";
            }
        ?>
        <li class="navbar-li" id="rules-nav">
            <a href="rules.php"> 
                Rules
            </a>
        </li>
        <?php
            if(isset($_SESSION['logged']) && $_SESSION['logged'] == TRUE)
                echo "
                    <li class=\"navbar-li\">
                        <a href=\"account.php\">
                            Account
                        </a>
                    </li>
                    ";
        ?>
    </ul>
</nav>
