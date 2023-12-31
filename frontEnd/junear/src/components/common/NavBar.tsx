import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as Logo } from 'assets/image/nav-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ProfileImageState, resetProfileImage } from 'recoil/atom';

const pages = [
  { label: '기업검색', link: '/corporation-search' },
  { label: '뉴스보기', link: '/news' },
  { label: '포트폴리오 생성', link: '/portfolio' },
  { label: '내 포트폴리오', link: '/my-portfolio' },
];
const settings = [
  { label: '마이페이지', link: '/mypage' },
  { label: '로그아웃', link: '/login' },
];

function ResponsiveAppBar() {
  const ACCESS_TOKEN = localStorage.getItem('access_token');
  const profileImg = useRecoilValue(ProfileImageState);
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // 로그아웃을 클릭하면 localStorage에서 access_token을 제거합니다.
    localStorage.removeItem('access_token');
    resetProfileImage();
    // 로그아웃 후 로그인 페이지로 이동합니다.
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#222831' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Container sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
              <Logo />
              <Typography
                noWrap
                component="div"
                sx={{
                  ml: 2,
                  mr: '120px',
                  mb: 1,
                  fontFamily: 'Noto Sans KR',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: '#00ADB5',
                  textDecoration: 'none',
                  wordWrap: 'break-word',
                  textAlign: 'center',
                  fontSize: 30,
                }}
              >
                JUNEAR
              </Typography>
            </Container>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page.label} to={page.link}>
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography noWrap textAlign="center">
                      {page.label}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'noto Sans KR',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#00ADB5',
              textDecoration: 'none',
              fontSize: 30,
            }}
          >
            JUNEAR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.label} to={page.link}>
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ mx: 1, my: 2, color: location.pathname === page.link ? '#00ADB5' : 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {ACCESS_TOKEN ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profileImg} />
                </IconButton>
              </Tooltip>
            ) : (
              <Link to="/login">
                <Button onClick={handleCloseUserMenu} sx={{ mx: 1, my: 2, color: 'white', display: 'block' }}>
                  로그인/회원가입
                </Button>
              </Link>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link key={setting.label} to={setting.link}>
                  <MenuItem
                    key={setting.label}
                    onClick={setting.label === '로그아웃' ? handleLogout : handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
