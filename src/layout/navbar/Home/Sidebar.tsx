import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "@shared/providers/AuthProviders";
const drawerWidth = 240;
function Sidebar({ children }: { children: React.ReactNode }) {
	const { signOut } = useAuth();
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const settingsWithFunc = [
		{
			name: "Logout",
			func: async () => {
				await signOut();
			},
		},
	];

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ display: "flex", width: "100%" }}>
			<AppBar
				position="fixed"
				sx={{
					backgroundColor: "secondary.dark",
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: {
							xs: "space-between",
							lg: "flex-end",
						},
						flex: 1,
					}}
				>
					<Box display={"flex"} alignItems={"center"} gap={1}>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settingsWithFunc.map((setting) => (
									<MenuItem
										key={setting?.name}
										onClick={() => {
											setting.func();
											handleCloseUserMenu();
										}}
									>
										<Typography textAlign="center">{setting?.name}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { lg: `calc(95% - ${drawerWidth}px)`, xs: `calc(95% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar></Toolbar>
				{children}
			</Box>
		</Box>
	);
}

export default Sidebar;
